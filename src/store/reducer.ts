import { combineReducers } from '@reduxjs/toolkit';
import { contractorReducer } from 'pages/contractors/store/contractors.slice';

export const rootReducer = combineReducers({ contractors: contractorReducer });
