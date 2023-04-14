import { actions } from './contractors.slice';
import { getContractors } from 'services';

export const ContractorAction = {
  ...actions,
  getContractors
};
