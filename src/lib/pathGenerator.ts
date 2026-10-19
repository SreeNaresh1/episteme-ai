import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface WeekPlan {
  week_number: number;
  title: string;
  description: string;
  hours_allocated: number;
  resources: {
    title: string;
    url: string;
    platform: string;
    is_free: boolean;
  }[];
}

export interface LearningPath {
  weeks: WeekPlan[];
  total_hours_used: number;
  prerequisites_note: string;
}

const FREE_COURSE_DATABASE: Record<string, { title: string; url: string; platform: string }[]> = {
  'data analyst': [
    { title: 'Google Data Analytics Certificate', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', platform: 'Coursera' },
    { title: 'Python for Everybody', url: 'https://www.coursera.org/specializations/python', platform: 'Coursera' },
    { title: 'SQL for Data Science', url: 'https://www.coursera.org/learn/sql-for-data-science', platform: 'Coursera' },
    { title: 'Statistics and Probability', url: 'https://www.khanacademy.org/math/statistics-probability', platform: 'Khan Academy' },
    { title: 'Intro to Data Analysis with Pandas', url: 'https://www.kaggle.com/learn/pandas', platform: 'Kaggle' },
    { title: 'Data Visualization with Python', url: 'https://www.kaggle.com/learn/data-visualization', platform: 'Kaggle' },
    { title: 'Intro to Machine Learning', url: 'https://www.kaggle.com/learn/intro-to-machine-learning', platform: 'Kaggle' },
    { title: 'Excel Skills for Business', url: 'https://www.coursera.org/specializations/excel', platform: 'Coursera' },
    { title: 'Tableau Public Training', url: 'https://public.tableau.com/app/learn/how-to-videos', platform: 'Tableau Public' },
    { title: 'Power BI Tutorial', url: 'https://learn.microsoft.com/en-us/power-bi/fundamentals/service-get-started', platform: 'Microsoft Learn' },
    { title: 'Introduction to SQL', url: 'https://mode.com/sql-tutorial/', platform: 'Mode Analytics' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/', platform: 'Python Docs' },
    { title: 'Pandas Documentation', url: 'https://pandas.pydata.org/docs/getting_started/index.html', platform: 'Pandas' },
    { title: 'Matplotlib Tutorials', url: 'https://matplotlib.org/stable/tutorials/index.html', platform: 'Matplotlib' },
    { title: 'Seaborn Tutorial', url: 'https://seaborn.pydata.org/tutorial.html', platform: 'Seaborn' },
  ],
  'web developer': [
    { title: 'The Odin Project', url: 'https://www.theodinproject.com/', platform: 'The Odin Project' },
    { title: 'freeCodeCamp Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', platform: 'freeCodeCamp' },
    { title: 'JavaScript Algorithms and Data Structures', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', platform: 'freeCodeCamp' },
    { title: 'MDN Web Docs Guides', url: 'https://developer.mozilla.org/en-US/docs/Learn', platform: 'MDN' },
    { title: 'React Official Docs', url: 'https://react.dev/learn', platform: 'React' },
  ],
  'machine learning': [
    { title: 'Machine Learning Specialization', url: 'https://www.coursera.org/specializations/machine-learning-introduction', platform: 'Coursera' },
    { title: 'Fast.ai Practical Deep Learning', url: 'https://course.fast.ai/', platform: 'Fast.ai' },
    { title: 'Kaggle ML Course', url: 'https://www.kaggle.com/learn/intro-to-machine-learning', platform: 'Kaggle' },
    { title: 'Google ML Crash Course', url: 'https://developers.google.com/machine-learning/crash-course', platform: 'Google' },
  ],
};

function findRelevantCourses(goal: string): { title: string; url: string; platform: string }[] {
  const goalLower = goal.toLowerCase();
  let courses: { title: string; url: string; platform: string }[] = [];
  
  for (const [key, val] of Object.entries(FREE_COURSE_DATABASE)) {
    if (goalLower.includes(key) || key.split(' ').some(w => goalLower.includes(w))) {
      courses = [...courses, ...val];
    }
  }
  
  // Default to data analyst courses if no match
  if (courses.length === 0) {
    courses = FREE_COURSE_DATABASE['data analyst'];
  }
  
  return courses;
}

export async function generateLearningPath(
  goal: string,
  level: string,
  weeklyHours: number,
  horizonWeeks: number
): Promise<LearningPath> {
  const totalHours = weeklyHours * horizonWeeks;
  const relevantCourses = findRelevantCourses(goal);
  const approvedUrls = new Set(relevantCourses.map(c => c.url));

  if (process.env.GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      const prompt = `You are an expert learning path builder. Create a structured week-by-week learning plan.

Goal: "${goal}"
Starting Level: ${level}
Weekly Hours Available: ${weeklyHours} hours/week
Duration: ${horizonWeeks} weeks (Total: ${totalHours} hours)

Available FREE Resources to use (use EXACT URLs — do not invent URLs):
${relevantCourses.map((c, i) => `${i + 1}. [${c.platform}] ${c.title} → ${c.url}`).join('\n')}

STRICT Rules (violations will cause rejection):
1. "weeks" array must contain exactly ${horizonWeeks} objects, week_number 1..${horizonWeeks}
2. Each week: hours_allocated must equal exactly ${weeklyHours} (not more, not less)
3. Sum of all hours_allocated must equal exactly ${totalHours}
4. Every resource URL must be taken verbatim from the list above — no other URLs allowed
5. Each week must have 1-3 resources; all resources must have title, url, platform, is_free=true
6. Order topics so prerequisites come first (basics → core → applied → portfolio)
7. Return ONLY valid JSON — no markdown fences, no explanation text

JSON schema:
{
  "weeks": [
    {
      "week_number": <integer>,
      "title": "<concise week title>",
      "description": "<1-2 sentence learning objective>",
      "hours_allocated": ${weeklyHours},
      "resources": [
        { "title": "<title>", "url": "<exact url>", "platform": "<platform>", "is_free": true }
      ]
    }
  ],
  "total_hours_used": ${totalHours},
  "prerequisites_note": "<brief rationale for topic ordering>"
}`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const jsonMatch = text.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as LearningPath;
        const errors = validatePath(parsed, weeklyHours, horizonWeeks, totalHours, approvedUrls);

        if (errors.length === 0) {
          // Recalculate to ensure consistency
          parsed.total_hours_used = parsed.weeks.reduce((s, w) => s + w.hours_allocated, 0);
          return parsed;
        } else {
          console.warn(`Gemini output failed validation (${errors.length} error(s)), using fallback:`, errors);
        }
      }
    } catch (err) {
      console.error('Gemini error, falling back to rule-based:', err);
    }
  }

  // Rule-based fallback (always valid by construction)
  return generateRuleBasedPath(goal, level, weeklyHours, horizonWeeks, relevantCourses);
}

/**
 * Validates a generated learning path against all constraints.
 * Returns an array of error strings (empty = valid).
 */
function validatePath(
  path: LearningPath,
  weeklyHours: number,
  horizonWeeks: number,
  totalHours: number,
  approvedUrls: Set<string>
): string[] {
  const errors: string[] = [];

  if (!Array.isArray(path.weeks)) {
    errors.push('weeks must be an array');
    return errors;
  }

  if (path.weeks.length !== horizonWeeks) {
    errors.push(`Expected ${horizonWeeks} weeks, got ${path.weeks.length}`);
  }

  let hoursSum = 0;
  const weekNums = new Set<number>();

  for (const week of path.weeks) {
    if (typeof week.week_number !== 'number') errors.push(`week_number missing or not a number`);
    if (weekNums.has(week.week_number)) errors.push(`Duplicate week_number ${week.week_number}`);
    weekNums.add(week.week_number);

    if (!week.title?.trim()) errors.push(`Week ${week.week_number}: title is empty`);
    if (!week.description?.trim()) errors.push(`Week ${week.week_number}: description is empty`);

    if (typeof week.hours_allocated !== 'number' || week.hours_allocated > weeklyHours || week.hours_allocated < 0.5) {
      errors.push(`Week ${week.week_number}: hours_allocated (${week.hours_allocated}) exceeds weekly limit (${weeklyHours}) or is invalid`);
    }
    hoursSum += week.hours_allocated ?? 0;

    if (!Array.isArray(week.resources) || week.resources.length === 0) {
      errors.push(`Week ${week.week_number}: must have at least one resource`);
    } else if (week.resources.length > 3) {
      errors.push(`Week ${week.week_number}: more than 3 resources`);
    } else {
      for (const r of week.resources) {
        if (!r.url?.startsWith('http')) errors.push(`Week ${week.week_number}: invalid resource URL "${r.url}"`);
        else if (!approvedUrls.has(r.url)) errors.push(`Week ${week.week_number}: URL not in approved list: ${r.url}`);
        if (!r.title?.trim()) errors.push(`Week ${week.week_number}: resource missing title`);
        if (!r.platform?.trim()) errors.push(`Week ${week.week_number}: resource missing platform`);
        if (r.is_free !== true) errors.push(`Week ${week.week_number}: resource not marked as free`);
      }
    }
  }

  if (Math.abs(hoursSum - totalHours) > 0) {
    errors.push(`Total hours mismatch: sum=${hoursSum}, expected=${totalHours}`);
  }

  return errors;
}


function generateRuleBasedPath(
  goal: string,
  level: string,
  weeklyHours: number,
  horizonWeeks: number,
  courses: { title: string; url: string; platform: string }[]
): LearningPath {
  const weeks: WeekPlan[] = [];
  const totalHours = weeklyHours * horizonWeeks;

  // Phase structure based on level
  const phases = level === 'beginner'
    ? [
        { name: 'Foundations', fraction: 0.3 },
        { name: 'Core Skills', fraction: 0.4 },
        { name: 'Applied Practice', fraction: 0.2 },
        { name: 'Portfolio & Capstone', fraction: 0.1 },
      ]
    : level === 'intermediate'
    ? [
        { name: 'Skill Refresh', fraction: 0.15 },
        { name: 'Advanced Topics', fraction: 0.45 },
        { name: 'Real Projects', fraction: 0.3 },
        { name: 'Portfolio Polish', fraction: 0.1 },
      ]
    : [
        { name: 'Deep Dive', fraction: 0.25 },
        { name: 'Specialisation', fraction: 0.4 },
        { name: 'Production Projects', fraction: 0.25 },
        { name: 'Leadership & Share', fraction: 0.1 },
      ];

  let courseIdx = 0;
  let weekNum = 1;

  for (const phase of phases) {
    const phaseWeeks = Math.round(horizonWeeks * phase.fraction);
    const phaseName = phase.name;

    for (let pw = 0; pw < phaseWeeks && weekNum <= horizonWeeks; pw++, weekNum++) {
      const resource = courses[courseIdx % courses.length];
      const nextResource = courses[(courseIdx + 1) % courses.length];
      courseIdx++;

      weeks.push({
        week_number: weekNum,
        title: `Week ${weekNum}: ${phaseName}`,
        description: `Focus on ${phaseName.toLowerCase()} for your goal: "${goal}". Complete key modules and practice exercises.`,
        hours_allocated: weeklyHours,
        resources: [
          {
            title: resource.title,
            url: resource.url,
            platform: resource.platform,
            is_free: true,
          },
          ...(pw % 2 === 0
            ? [{
                title: nextResource.title,
                url: nextResource.url,
                platform: nextResource.platform,
                is_free: true,
              }]
            : []),
        ],
      });
    }
  }

  // Fill any remaining weeks
  while (weekNum <= horizonWeeks) {
    const resource = courses[courseIdx % courses.length];
    courseIdx++;
    weeks.push({
      week_number: weekNum,
      title: `Week ${weekNum}: Practice & Review`,
      description: 'Review and consolidate learning from previous weeks. Work on a mini-project.',
      hours_allocated: weeklyHours,
      resources: [{ title: resource.title, url: resource.url, platform: resource.platform, is_free: true }],
    });
    weekNum++;
  }

  return {
    weeks,
    total_hours_used: totalHours,
    prerequisites_note: `Path ordered from ${level}-level foundations to applied practice, fitting ${weeklyHours}h/week over ${horizonWeeks} weeks.`,
  };
}
