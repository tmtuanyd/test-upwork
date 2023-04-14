import { createSlice } from '@reduxjs/toolkit';
import { ContractorState, FetchingStatus } from '../../../models';
import { getContractorsReducers } from './reducer/getContractors.reducers';

const initialState: ContractorState = {
  fetchingStatus: FetchingStatus.IDLE,
  contractors: null
};

const contractorsSlice = createSlice({
  name: 'contractors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getContractorsReducers(builder);
  }
});

export const { name, actions } = contractorsSlice;
export const contractorReducer = contractorsSlice.reducer;
