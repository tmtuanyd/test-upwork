import axios from '../lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContractorType } from '../models';

export const getContractors = createAsyncThunk(
  'contractors/getAll',
  async (): Promise<ContractorType[]> => {
    const response = await axios.get('/contractors');
    return response.data;
  }
);

export const updateContractor = async ({
  name,
  id
}: {
  name: string;
  id: number;
}): Promise<ContractorType> => {
  const response = await axios.patch(
    `/contractors`,
    { name },
    { params: { id: 'eq.' + id } }
  );
  return response.data;
};
