import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { ContractorSelectors } from './store/contractors.selectors';
import { ContractorAction } from './store';
import { ContractorType, FetchingStatus } from '../../models';
import { Box, IconButton, Typography } from '@mui/material';
import CustomTable from '../../components/table';
import moment from 'moment/moment';
import { EditRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SpinLoading from '../../components/SpinLoading';

const ContractorsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const contractorsData = useAppSelector(ContractorSelectors.getContractors);
  const { fetchingStatus, contractors } = contractorsData;
  const isLoading = [FetchingStatus.PENDING, FetchingStatus.IDLE].includes(fetchingStatus);

  const columnsList = [
    {
      columnName: 'id',
      columnTitle: 'ID',
      renderCell: (item: ContractorType) => <div>{item.id}</div>
    },
    {
      columnName: 'name',
      columnTitle: 'Name',
      renderCell: (item: ContractorType) => <div>{item.name}</div>
    },
    {
      columnName: 'created_at',
      columnTitle: 'Created date',
      renderCell: (item: ContractorType) => (
        <div>{moment(item.created_at).format('DD.MM.YYYY HH:mm:ss')}</div>
      )
    },
    {
      columnName: 'tenant_id',
      columnTitle: 'Tenant ID',
      renderCell: (item: ContractorType) => <div>{item.tenant_id}</div>
    },
    {
      columnName: 'action',
      columnTitle: '',
      renderCell: (item: ContractorType) => (
        <Box>
          <IconButton onClick={() => navigate(`/contractors/${item.id}`)}>
            <EditRounded />
          </IconButton>
        </Box>
      )
    }
  ];

  useEffect(() => {
    if (fetchingStatus !== FetchingStatus.FULFILLED) {
      dispatch(ContractorAction.getContractors());
    }
  }, []);

  if (isLoading) {
    return <SpinLoading />;
  }

  return (
    <Box p={4}>
      <Typography variant='h5'>Contractors</Typography>
      <Box>
        <CustomTable columnsList={columnsList} listData={contractors || []} />
      </Box>
    </Box>
  );
};

export default ContractorsPage;
