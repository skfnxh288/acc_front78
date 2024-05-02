import React, { useEffect, useState} from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';

//.layout
import Layout from 'layout';

//.css
import { gridSpacing } from '../../../../store/constant';
import {
  Grid,
  Stack,
  InputLabel,
  TextField,
  Button,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, Modal
} from '@mui/material';
import { baseColumnsProps} from '../types/types';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import accountApi from 'api/accountApi';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { useRouter } from 'next/router';
import { ModalPropsBudget } from '../../budget/types/type';
import { DataGrid } from '@mui/x-data-grid';


//CRUD 공장 만들다가 실패함.
const WorkplaceManagement = () => {
  //나중에 쓸거임
  const [workplaces, setWorkplaces] = useState<any[]>([]);
  const [parameter, setParameter] = useState<any[]>([]);
  const [modalOpen, modalSetOpen] = useState(false);


  // const searchModalData = (e: any) => {
  //   modalSetOpen(false);
  // }

  const modalColumn : ModalPropsBudget[] = [
    {
      headerName: "사업장 코드",
      field: 'workplaceCode',
      width: 250
    },
    {
      headerName: '사업장 명칭',
      field: 'workplaceName',
      width: 250
    }
  ];

  const getModalData = (data) => {
    modalSetOpen(false);
    console.log('함수로 보내진 데이터'+data)
    callParameter(data)
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9103/operate/allworkplacelist');
      modalSetOpen(true);
      console.log('allworkplacelist', response.data);
      setWorkplaces(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  //실제로 사용하는 호출 함수


  const callParameter = async (id) => {
    clearAll();
    try {
      const response = await accountApi.get(`http://localhost:9103/operate/workplace?workplaceCode=${id}`);
      console.log(id)
      console.log('Click', response.data);
      setParameter(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  //비동기 해결 못해서 이상한 짓 하는거임
  const clearAll = async () => {
    try {
      const response = await accountApi.get(`http://localhost:9103/operate/workplace?workplaceCode=1Q2w3E4rt`);
      console.log('Click', response.data);
      setParameter(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const [customerCode,setcustomerCode] = useState('')
  const [customerType,setcustomerType] = useState('')
  const [socialSecurityNumber,setsocialSecurityNumber] = useState('')
  const [accountNumber,setaccountNumber] = useState('')
  const [cardNumber,setcardNumber] = useState('')
  const [customerNote,setcustomerNote] = useState('')
  const [cardType,setcardType] = useState('')
  const [cardMemberName,setcardMemberName] = useState('')
  const [cardOpenPlace,setcardOpenPlace] = useState('')
  const [financialInstituteName,setfinancialInstituteName] = useState('')
  const [financialInstituteCode,setfinancialInstituteCode] = useState('')


  {/*불변 값은 parameter에 저장*/}
  const sendInsert = async () => {
    const data={
      customerCode:customerCode.customerCode,
      customerType:customerType.customerType,
      socialSecurityNumber:socialSecurityNumber.socialSecurityNumber,
      accountNumber:accountNumber.accountNumber,
      cardNumber:cardNumber.cardNumber,
      customerNote:customerNote.customerNote,
      cardType:cardType.cardType,
      cardMemberName:cardMemberName.cardMemberName,
      cardOpenPlace:cardOpenPlace.cardOpenPlace,
      financialInstituteName:financialInstituteName.financialInstituteName,
      financialInstituteCode:financialInstituteCode.financialInstituteCode,
      workplaceCode:parameter.workplaceCode,
      workplaceName:parameter.workplaceName,
      workplaceCeoName:parameter.workplaceCeoName,
      corporationLicence:parameter.corporationLicence,
      businessConditions:parameter.businessConditions,
      businessItems:parameter.businessItems,
      workplaceZipCode:parameter.workplaceZipCode,
      workplaceBasicAddress:parameter.workplaceBasicAddress,
      workplaceDetailAddress:parameter.workplaceDetailAddress,
      workplaceTelNumber:parameter.workplaceTelNumber,
      workplaceFaxNumber:parameter.workplaceFaxNumber,
    }
    console.log('전송된 데이터:', data);
    try {
      await accountApi.post(`http://localhost:9103/operate/insertCustomer`,data)
    }catch (error){
      console.log(error)
    }
  }


  {/* 주석처리용 */}
  // @ts-ignore
  return (
    <div>
      <Grid item sm={6} md={8}>
        <SubCard title="거래처 등록">

          <Modal open={modalOpen} style={{ marginLeft:400 , width: '100%',display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              style={{ height: 400, width: '100%', }}>
              <Box sx={{ height: 400, width: '40%', background: 'white', }}>
                <DataGrid
                  rows={workplaces}
                  columns={modalColumn}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  getRowId={(row) => row.workplaceCode}
                  onRowClick={(params) => getModalData(params.row.workplaceCode)}
                />
                <Button onClick={() => modalSetOpen(false)}>닫기</Button>
              </Box>
            </div>
          </Modal>

            <Grid container spacing={gridSpacing}>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처 코드</InputLabel>
                <TextField onChange={(event) => setcustomerCode({ customerCode: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장코드</InputLabel>
                <TextField onClick={fetchData}
                           value={parameter.workplaceCode}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}


                </Grid>


              <Grid item md={6} xs={12}>
                <InputLabel>거래처명</InputLabel>
                <TextField value={parameter.workplaceName}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처유형</InputLabel>
                <TextField  onChange={(event) => setcustomerType({ customerType: event.target.value })}
                            id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>대표자</InputLabel>
                <TextField value={parameter.workplaceCeoName}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업자등록번호</InputLabel>
                <TextField  value={parameter.corporationLicence}
                            id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>주민등록번호</InputLabel>
                <TextField onChange={(event) => setsocialSecurityNumber({ socialSecurityNumber: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>업태</InputLabel>
                <TextField  value={parameter.businessConditions}
                            id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>종목</InputLabel>
                <TextField value={parameter.businessItems}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처우편번호</InputLabel>
                <TextField  value={parameter.workplaceZipCode}
                            id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처기본주소</InputLabel>
                <TextField value={parameter.workplaceBasicAddress}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처세부주소</InputLabel>
                <TextField  value={parameter.workplaceDetailAddress}
                            id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처전화번호</InputLabel>
                <TextField  value={parameter.workplaceTelNumber}
                            id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처팩스번호</InputLabel>
                <TextField  value={parameter.workplaceFaxNumber}
                            id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>계좌번호</InputLabel>
                <TextField onChange={(event) => setaccountNumber({ accountNumber: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>카드번호</InputLabel>
                <TextField onChange={(event) => setcardNumber({ cardNumber: event.target.value })}
                            id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>비고</InputLabel>
                <TextField onChange={(event) => setcustomerNote({ customerNote: event.target.value })}
                          id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>카드구분</InputLabel>
                <TextField onChange={(event) => setcardType({ cardType: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>카드회원명</InputLabel>
                <TextField onChange={(event) => setcardMemberName({ cardMemberName: event.target.value })}
                          id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>카드가맹점번호</InputLabel>
                <TextField onChange={(event) => setcardOpenPlace({ cardOpenPlace: event.target.value })}
                          id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>금융기관명</InputLabel>
                <TextField onChange={(event) => setfinancialInstituteName({ financialInstituteName: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>금융기관코드</InputLabel>
                <TextField onChange={(event) => setfinancialInstituteCode({ financialInstituteCode: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row">
                  <AnimateButton>
                    <Button
                      sx={{ width: '100px' }}
                      variant="contained"
                      onClick={sendInsert}
                    >
                      저장
                    </Button>
                  </AnimateButton>
                </Stack>
              </Grid>
            </Grid>
        </SubCard>
      </Grid>
    </div>
  )
}
WorkplaceManagement.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default WorkplaceManagement;