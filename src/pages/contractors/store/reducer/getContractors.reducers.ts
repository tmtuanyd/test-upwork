import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ContractorState, FetchingStatus } from 'models';
import { getContractors } from 'services';

export const getContractorsReducers = (builder: ActionReducerMapBuilder<ContractorState>) => {
  builder.addCase(getContractors.pending, (state) => {
    state.fetchingStatus = FetchingStatus.PENDING;
  });
  builder.addCase(getContractors.fulfilled, (state, action) => {
    state.fetchingStatus = FetchingStatus.FULFILLED;
    state.contractors = action.payload;
  });
  builder.addCase(getContractors.rejected, (state) => {
    state.fetchingStatus = FetchingStatus.REJECTED;
  });
};
