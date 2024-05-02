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
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import { baseColumnsProps} from '../types/types';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import accountApi from 'api/accountApi';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { useRouter } from 'next/router';

//SAGA 만들어놓은걸 깜빡하고 페이지를 찍어내버림.
const customerManagement = () => {
  const [Customer, setCustomer] = useState<any[]>([]);
  const [parameter, setParameter] = useState<any[]>([]);
  //나중에 쓸거임
  const router = useRouter();

  const go = () => {
    router.push('./insertCustomer');
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9103/operate/CustomerList');
      console.log('allworkplacelist', response.data);
      setCustomer(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  //칼럼에 들어가는 내용은 오퍼레이터 인덱스 또는 받은 데이터의 칼럼 값과 일치해야함.
  const columns: baseColumnsProps[] = [
    { id: 'customerCode', label: '거래처 코드', minWidth: 50 },
    { id: 'customerName', label: '거래처 이름', minWidth: 100 },
  ];
  //실제로 사용하는 호출 함수
  const callParameter = async (id) => {
    clearAll();
    try {
      const response = await accountApi.get(`http://localhost:9103/operate/CustomerListId?customerCode=${id}`);
      alert(id)
      console.log('Click', response.data);
      setParameter(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  //비동기 해결 못해서 이상한 짓 하는거임
  const clearAll = async () => {
    try {
      const response = await accountApi.get(`http://localhost:9103/operate/CustomerListId?customerCode=1Q2w3E4rt`);
      console.log('Click', response.data);
      setParameter(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  // const [customerCode,setcustomerCode] = useState('')
  // const [workplaceCode,setworkplaceCode] = useState('')


  const [customerName,setcustomerName] = useState('')
  const [customerType,setcustomerType] = useState('')
  const [customerCeo,setcustomerCeo] = useState('')
  const [businessLicenseNumber,setbusinessLicenseNumber] = useState('')
  const [socialSecurityNumber,setsocialSecurityNumber] = useState('')
  const [customerBusinessItems,setcustomerBusinessItems] = useState('')
  const [customerZipCode,setcustomerZipCode] = useState('')
  const [customerBasicAddress,setcustomerBasicAddress] = useState('')
  const [customerDetailAddress,setcustomerDetailAddress] = useState('')
  const [customerTelNumber,setcustomerTelNumber] = useState('')
  const [customerFaxNumber,setcustomerFaxNumber] = useState('')
  const [accountNumber,setaccountNumber] = useState('')
  const [cardNumber,setcardNumber] = useState('')
  const [customerNote,setcustomerNote] = useState('')
  const [cardType,setcardType] = useState('')
  const [cardMemberName,setcardMemberName] = useState('')
  const [cardOpenPlace,setcardOpenPlace] = useState('')
  const [financialInstituteName,setfinancialInstituteName] = useState('')
  const [financialInstituteCode,setfinancialInstituteCode] = useState('')
  const [customerBusinessConditions,setcustomerBusinessConditions] = useState('')

  {/*불변 값은 parameter에 저장*/}
  const sendUpdate = async () => {
    const data={
      customerCode:parameter.customerCode,
      workplaceCode:parameter.workplaceCode,

      customerName:customerName.customerName || parameter.customerName,
      customerType:customerType.customerType || parameter.customerType,
      customerCeo:customerCeo.customerCeo || parameter.customerCeo,
      businessLicenseNumber:businessLicenseNumber.businessLicenseNumber || parameter.businessLicenseNumber,
      socialSecurityNumber:socialSecurityNumber.socialSecurityNumber || parameter.socialSecurityNumber,
      customerBusinessConditions:customerBusinessConditions.customerBusinessConditions || parameter.customerBusinessConditions,
      customerBusinessItems:customerBusinessItems.customerBusinessItems || parameter.customerBusinessItems,
      customerZipCode:customerZipCode.customerZipCode || parameter.customerZipCode,
      customerBasicAddress:customerBasicAddress.customerBasicAddress || parameter.customerBasicAddress,
      customerDetailAddress:customerDetailAddress.customerDetailAddress || parameter.customerDetailAddress,
      customerTelNumber:customerTelNumber.customerTelNumber || parameter.customerTelNumber,
      customerFaxNumber:customerFaxNumber.customerFaxNumber || parameter.customerFaxNumber,
      accountNumber:accountNumber.accountNumber || parameter.accountNumber,
      cardNumber:cardNumber.cardNumber || parameter.cardNumber,
      customerNote:customerNote.customerNote || parameter.customerNote,
      cardType:cardType.cardType || parameter.cardType,
      cardMemberName:cardMemberName.cardMemberName || parameter.cardMemberName,
      cardOpenPlace:cardOpenPlace.cardOpenPlace || parameter.cardOpenPlace,

      financialInstituteName:financialInstituteName.financialInstituteName || parameter.financialInstituteName,
      financialInstituteCode:financialInstituteCode.financialInstituteCode || parameter.financialInstituteCode
    }
    console.log('전송된 데이터:', data);
    try {
      await accountApi.post(`http://localhost:9103/operate/updateCustomer`,data)
    }catch (error){
      console.log(error)
    }
  }

  const sendDelete = async () => {
    const data={
      workplaceCode:parameter.customerCode,
    }
    console.log('전송된 데이터:', data);
    try {
      await accountApi.post(`http://localhost:9103/operate/deleteCustomer`,data)
    }catch (error){
      console.log(error)
    }
    alert("데이터가 삭제됨")
    clearAll();
    fetchData();
  }


  {/* 주석처리용 */}
  // @ts-ignore
  return (
    <div>
      <Grid key={gridSpacing}>
        <Grid item xs={12} lg={4}>
          <MainCard content={false} title="거래처 목록" secondary={<Stack direction="row" spacing={2} alignItems="center">
            <div style={{ marginLeft: 50 }}>
              <AnimateButton>
                <Button
                  sx={{ width: '200px' }}
                  variant="contained"
                  onClick={go}
                >
                  신규 거래처 생성
                </Button>
              </AnimateButton>
            </div>
          </Stack>}>
            <TableContainer sx={{ maxHeight: 440 }}>


              {/*테이블이 들어가는 자리*/}
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell sx={{ py: 3 }} key={column.id} align={column.align}
                                 style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* dispatch를 통해 가져온 데이터를 사용하여 테이블에 렌더링 */}
                  {Customer.map((row: any) => (
                    <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={row.customerCode}>
                      {/* 여기서 row.customerCode 등의 속성을 사용하여 원하는 데이터에 접근할 수 있습니다. */}
                      {columns.map((column) => (
                        <TableCell onClick={() => {
                          callParameter(row[column.id]);
                        }} key={column.id} align={column.align}>
                          {row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCard>
        </Grid>
      </Grid>

      <Grid item sm={6} md={8}>
        <SubCard title="거래처 수정">
          {parameter && (
            <Grid container spacing={gridSpacing}>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처 코드</InputLabel>
                <TextField onChange={(event) => setcustomerCode({ customerCode: event.target.value })}
                           defaultValue={parameter.customerCode} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장코드</InputLabel>
                <TextField onChange={(event) => setworkplaceCode({ workplaceCode: event.target.value })}
                           defaultValue={parameter.workplaceCode} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처명</InputLabel>
                <TextField onChange={(event) => setcustomerName({ customerName: event.target.value })}
                           defaultValue={parameter.customerName}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처유형</InputLabel>
                <TextField onChange={(event) => setcustomerType({ customerType: event.target.value })}
                           defaultValue={parameter.customerType} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>대표자</InputLabel>
                <TextField onChange={(event) => setcustomerCeo({ customerCeo: event.target.value })}
                           defaultValue={parameter.customerCeo} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업자등록번호</InputLabel>
                <TextField onChange={(event) => setbusinessLicenseNumber({ businessLicenseNumber: event.target.value })}
                           defaultValue={parameter.businessLicenseNumber} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>주민등록번호</InputLabel>
                <TextField onChange={(event) => setsocialSecurityNumber({ socialSecurityNumber: event.target.value })}
                           defaultValue={parameter.socialSecurityNumber} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>업태</InputLabel>
                <TextField onChange={(event) => setcustomerBusinessConditions({ customerBusinessConditions: event.target.value })}
                           defaultValue={parameter.customerBusinessConditions} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>종목</InputLabel>
                <TextField onChange={(event) => setcustomerBusinessItems({ customerBusinessItems: event.target.value })}
                           defaultValue={parameter.customerBusinessItems} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처우편번호</InputLabel>
                <TextField onChange={(event) => setcustomerZipCode({ customerZipCode: event.target.value })}
                           defaultValue={parameter.customerZipCode}  id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처기본주소</InputLabel>
                <TextField onChange={(event) => setcustomerBasicAddress({ customerBasicAddress: event.target.value })}
                           defaultValue={parameter.customerBasicAddress} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처세부주소</InputLabel>
                <TextField onChange={(event) => setcustomerDetailAddress({ customerDetailAddress: event.target.value })}
                           defaultValue={parameter.customerDetailAddress} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처전화번호</InputLabel>
                <TextField onChange={(event) => setcustomerTelNumber({ customerTelNumber: event.target.value })}
                           defaultValue={parameter.customerTelNumber} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처팩스번호</InputLabel>
                <TextField onChange={(event) => setcustomerFaxNumber({ customerFaxNumber: event.target.value })}
                           defaultValue={parameter.customerFaxNumber} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>계좌번호</InputLabel>
                <TextField onChange={(event) => setaccountNumber({ accountNumber: event.target.value })}
                           defaultValue={parameter.accountNumber} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>카드번호</InputLabel>
                <TextField onChange={(event) => setcardNumber({ cardNumber: event.target.value })}
                           defaultValue={parameter.cardNumber} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>비고</InputLabel>
                <TextField onChange={(event) => setcustomerNote({ customerNote: event.target.value })}
                           defaultValue={parameter.customerNote} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>카드구분</InputLabel>
                <TextField onChange={(event) => setcardType({ cardType: event.target.value })}
                           defaultValue={parameter.cardType} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>카드회원명</InputLabel>
                <TextField onChange={(event) => setcardMemberName({ cardMemberName: event.target.value })}
                           defaultValue={parameter.cardMemberName} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>카드가맹점번호</InputLabel>
                <TextField onChange={(event) => setcardOpenPlace({ cardOpenPlace: event.target.value })}
                           defaultValue={parameter.cardOpenPlace} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>금융기관명</InputLabel>
                <TextField onChange={(event) => setfinancialInstituteName({ financialInstituteName: event.target.value })}
                           defaultValue={parameter.financialInstituteName} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>금융기관코드</InputLabel>
                <TextField onChange={(event) => setfinancialInstituteCode({ financialInstituteCode: event.target.value })}
                           defaultValue={parameter.financialInstituteCode} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row">
                  <div style={{ marginLeft: 0 }}>
                    <AnimateButton>
                      <Button
                        sx={{ width: '100px' }}
                        variant="contained"
                        onClick={sendUpdate}
                      >
                        저장
                      </Button>
                    </AnimateButton>
                  </div>
                  <div style={{ marginLeft: 50 }}>
                    <AnimateButton>
                      <Button
                        sx={{ width: '100px' }}
                        variant="contained"
                        onClick={sendDelete}
                      >
                        삭제
                      </Button>
                    </AnimateButton>
                  </div>
                </Stack>
              </Grid>
            </Grid>
          )}
        </SubCard>
      </Grid>
    </div>
  )
}
customerManagement.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default customerManagement;