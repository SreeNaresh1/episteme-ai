import { WeekCurriculumTopic } from '../pathGenerator';
import { WEB_DEV_52_WEEKS } from './webDev';
import { MACHINE_LEARNING_52_WEEKS } from './machineLearning';
import { CYBERSECURITY_52_WEEKS } from './cybersecurity';
import { CLOUD_DEVOPS_52_WEEKS } from './cloudDevOps';
import { PYTHON_DEV_52_WEEKS } from './pythonDev';
import { DATA_ENGINEER_52_WEEKS } from './dataEngineer';

export {
  WEB_DEV_52_WEEKS,
  MACHINE_LEARNING_52_WEEKS,
  CYBERSECURITY_52_WEEKS,
  CLOUD_DEVOPS_52_WEEKS,
  PYTHON_DEV_52_WEEKS,
  DATA_ENGINEER_52_WEEKS,
};

export const REGISTERED_CURRICULA: Record<string, WeekCurriculumTopic[]> = {
  'web developer': WEB_DEV_52_WEEKS,
  'machine learning': MACHINE_LEARNING_52_WEEKS,
  'cybersecurity': CYBERSECURITY_52_WEEKS,
  'cloud devops': CLOUD_DEVOPS_52_WEEKS,
  'python': PYTHON_DEV_52_WEEKS,
  'data engineer': DATA_ENGINEER_52_WEEKS,
};
