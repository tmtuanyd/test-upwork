import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { ContractorSelectors } from './store/contractors.selectors';
import { ContractorAction } from './store';
import { ContractorType, FetchingStatus } from '../../models';
import SpinLoading from '../../components/SpinLoading';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, Divider, Grid, IconButton, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import FormTextField from '../../components/Form/FormTextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBackIosNewOutlined, EditOutlined } from '@mui/icons-material';
import moment from 'moment';
import { updateContractor } from '../../services';

export const ContractorSchema = yup
  .object({
    name: yup.string().required('Name is require field')
  })
  .required();

const ContractorDetails = () => {
  const dispatch = useAppDispatch();
  const contractorsData = useAppSelector(ContractorSelectors.getContractors);
  const { fetchingStatus, contractors } = contractorsData;
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const isLoading = [FetchingStatus.PENDING, FetchingStatus.IDLE].includes(fetchingStatus);

  const contractorDetail = useMemo(
    () => contractors?.find((c) => c.id === parseInt(id)),
    [contractors]
  );
  const methods = useForm({
    mode: 'all',
    defaultValues: contractorDetail,
    resolver: yupResolver(ContractorSchema)
  });
  const {
    reset,
    handleSubmit,
    control,
    formState: { isValid, isSubmitting }
  } = methods;

  const onSubmit = async (data: ContractorType) => {
    try {
      await updateContractor({ name: data.name, id: data.id });
      await dispatch(ContractorAction.getContractors());
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!contractors) {
      dispatch(ContractorAction.getContractors());
    }
  }, []);

  useEffect(() => {
    reset(contractorDetail);
  }, [contractorDetail]);

  if (isLoading) {
    return <SpinLoading />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={2}>
          <Box display='flex' gap={1} alignItems='center'>
            <Typography variant='h5'>Contractor detail</Typography>
            <IconButton onClick={() => setIsEdit(true)}>
              <EditOutlined />
            </IconButton>
          </Box>
          <Button onClick={() => navigate('/contractors')}>
            <ArrowBackIosNewOutlined /> Back to list
          </Button>

          {!isEdit && (
            <Grid container maxWidth={400} spacing={2} mt={4} mx={2}>
              <Grid item xs={4} md={3}>
                Id
              </Grid>
              <Grid item xs={8} md={9}>
                {contractorDetail?.id}
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={4} md={3}>
                Name
              </Grid>
              <Grid item xs={8} md={9}>
                {contractorDetail?.name}
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={4} md={3}>
                Create date
              </Grid>
              <Grid item xs={8} md={9}>
                {contractorDetail?.created_at
                  ? moment(contractorDetail.created_at).format('DD.MM.YYYY HH:mm:ss')
                  : ''}
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={4} md={3}>
                Tenant Id
              </Grid>
              <Grid item xs={8} md={9}>
                {contractorDetail?.tenant_id}
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          )}

          {isEdit && (
            <Card variant='outlined' sx={{ maxWidth: 400, p: 4, mt: 4 }}>
              <FormTextField control={control} name={'name'} label={'Name*'} />
              <Box display='flex' gap={4} mt={4}>
                <Button variant='outlined' onClick={() => setIsEdit(false)}>
                  Cancel
                </Button>
                <Button variant='contained' disabled={!isValid || isSubmitting} type='submit'>
                  Save
                </Button>
              </Box>
            </Card>
          )}
        </Box>
      </form>
    </FormProvider>
  );
};

export default ContractorDetails;
