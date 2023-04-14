import { RootState } from 'store';

const getContractors = (state: RootState) => state.contractors;

export const ContractorSelectors = {
  getContractors
};
