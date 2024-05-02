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

//CRUD 공장 만들다가 실패함.
const WorkplaceManagement = () => {
  const [workplaces, setWorkplaces] = useState<any[]>([]);
  const [parameter, setParameter] = useState<any[]>([]);
  //나중에 쓸거임
  const router = useRouter();

  const go = () => {
    router.push('./insertWorkplace');
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9103/operate/allworkplacelist');
      console.log('allworkplacelist', response.data);
      setWorkplaces(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  //칼럼에 들어가는 내용은 오퍼레이터 인덱스 또는 받은 데이터의 칼럼 값과 일치해야함.
  const columns: baseColumnsProps[] = [
    { id: 'workplaceCode', label: '거래처 코드', minWidth: 50 },
    { id: 'workplaceName', label: '거래처 이름', minWidth: 100 },
  ];
  //실제로 사용하는 호출 함수
  const callParameter = async (id) => {
    clearAll();
    try {
      const response = await accountApi.get(`http://localhost:9103/operate/workplace?workplaceCode=${id}`);
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
      const response = await accountApi.get(`http://localhost:9103/operate/workplace?workplaceCode=1Q2w3E4rt`);
      console.log('Click', response.data);
      setParameter(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const [workplaceName,setworkplaceName] = useState('')
  const [businessLicense,setbusinessLicense] = useState('')
  const [corporationLicence,setcorporationLicence] = useState('')
  const [workplaceCeoName,setworkplaceCeoName] = useState('')
  const [businessConditions,setbusinessConditions] = useState('')
  const [businessItems,setbusinessItems] = useState('')
  const [workplaceZipCode,setworkplaceZipCode] = useState('')
  const [workplaceBasicAddress,setworkplaceBasicAddress] = useState('')
  const [workplaceDetailAddress,setworkplaceDetailAddress] = useState('')
  const [workplaceTelNumber,setworkplaceTelNumber] = useState('')
  const [workplaceFaxNumber,setworkplaceFaxNumber] = useState('')
  const [workplaceEstablishDate,setworkplaceEstablishDate] = useState('')
  const [workplaceOpenDate,setworkplaceOpenDate] = useState('')
  const [workplaceCloseDate,setworkplaceCloseDate] = useState('')

  const sendUpdate = async () => {
    const data={
      workplaceCode:parameter.workplaceCode,
      companyCode:parameter.companyCode,
      workplaceName:workplaceName.workplaceName ||parameter.workplaceName,
      businessLicense:businessLicense.businessLicense ||parameter.businessLicense,
      corporationLicence:corporationLicence.corporationLicence ||parameter.corporationLicence,
      workplaceCeoName:workplaceCeoName.workplaceCeoName ||parameter.workplaceCeoName,
      businessConditions:businessConditions.businessConditions ||parameter.businessConditions,
      businessItems:businessItems.businessItems ||parameter.businessItems,
      workplaceZipCode:workplaceZipCode.workplaceZipCode ||parameter.workplaceZipCode,
      workplaceBasicAddress:workplaceBasicAddress.workplaceBasicAddress ||parameter.workplaceBasicAddress,
      workplaceDetailAddress:workplaceDetailAddress.workplaceDetailAddress ||parameter.workplaceDetailAddress,
      workplaceTelNumber:workplaceTelNumber.workplaceTelNumber ||parameter.workplaceTelNumber,
      workplaceFaxNumber:workplaceFaxNumber.workplaceFaxNumber ||parameter.workplaceFaxNumber,
      workplaceEstablishDate:workplaceEstablishDate.workplaceEstablishDate ||parameter.workplaceEstablishDate,
      workplaceOpenDate:workplaceOpenDate.workplaceOpenDate ||parameter.workplaceOpenDate,
      workplaceCloseDate:workplaceCloseDate.workplaceCloseDate ||parameter.workplaceCloseDate
    }
    console.log('전송된 데이터:', data);
    try {
      await accountApi.post(`http://localhost:9103/operate/updateWorkplace`,data)
    }catch (error){
      console.log(error)
    }
  }

  const sendDelete = async () => {
    const data={
      workplaceCode:parameter.workplaceCode,
    }
    console.log('전송된 데이터:', data);
    try {
      await accountApi.post(`http://localhost:9103/operate/workplaceremoval`,data)
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
          <MainCard content={false} title="사업장 목록" secondary={<Stack direction="row" spacing={2} alignItems="center">
            <div style={{ marginLeft: 50 }}>
              <AnimateButton>
                <Button
                  sx={{ width: '200px' }}
                  variant="contained"
                  onClick={go}
                >
                 신규 사업장 생성
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
                  {workplaces.map((row: any) => (
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
        <SubCard title="사업장 수정">
          {parameter && (
            <Grid container spacing={gridSpacing}>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처 코드</InputLabel>
                <TextField onChange={(event) => setworkplaceCode({ workplaceCode: event.target.value })}
                  defaultValue={parameter.workplaceCode} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>회사코드</InputLabel>
                <TextField onChange={(event) => setcompanyCode({ companyCode: event.target.value })}
                  defaultValue={parameter.companyCode} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장명</InputLabel>
                <TextField onChange={(event) => setworkplaceName({ workplaceName: event.target.value })}
                           defaultValue={parameter.workplaceName}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장 등록번호</InputLabel>
                <TextField onChange={(event) => setbusinessLicense({ businessLicense: event.target.value })}
                           defaultValue={parameter.businessLicense} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>법인 등록번호</InputLabel>
                <TextField onChange={(event) => setcorporationLicence({ corporationLicence: event.target.value })}
                           defaultValue={parameter.corporationLicence} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>대표자명</InputLabel>
                <TextField onChange={(event) => setworkplaceCeoName({ workplaceCeoName: event.target.value })}
                           defaultValue={parameter.workplaceCeoName} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>업태</InputLabel>
                <TextField onChange={(event) => setbusinessConditions({ businessConditions: event.target.value })}
                           defaultValue={parameter.businessConditions} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>종목</InputLabel>
                <TextField onChange={(event) => setbusinessItems({ businessItems: event.target.value })}
                           defaultValue={parameter.businessItems} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장 우편번호</InputLabel>
                <TextField onChange={(event) => setworkplaceZipCode({ workplaceZipCode: event.target.value })}
                           defaultValue={parameter.workplaceZipCode} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장 기본주소</InputLabel>
                <TextField onChange={(event) => setworkplaceBasicAddress({ workplaceBasicAddress: event.target.value })}
                           defaultValue={parameter.workplaceBasicAddress}  id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장 세부주소</InputLabel>
                <TextField onChange={(event) => setworkplaceDetailAddress({ workplaceDetailAddress: event.target.value })}
                           defaultValue={parameter.workplaceDetailAddress} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장 전화번호</InputLabel>
                <TextField onChange={(event) => setworkplaceTelNumber({ workplaceTelNumber: event.target.value })}
                           defaultValue={parameter.workplaceTelNumber} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장 팩스번호</InputLabel>
                <TextField onChange={(event) => setworkplaceFaxNumber({ workplaceFaxNumber: event.target.value })}
                           defaultValue={parameter.workplaceFaxNumber} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장개업년월일</InputLabel>
                <TextField onChange={(event) => setworkplaceEstablishDate({ workplaceEstablishDate: event.target.value })}
                           defaultValue={parameter.workplaceEstablishDate} id="outlined-basic14"  fullWidth type="date" style={{width: '200px'}} />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장설립년월일</InputLabel>
                <TextField onChange={(event) => setworkplaceOpenDate({ workplaceOpenDate: event.target.value })}
                           defaultValue={parameter.workplaceOpenDate} id="outlined-basic14"  fullWidth type="date" style={{width: '200px'}} />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장폐업년월일</InputLabel>
                <TextField onChange={(event) => setworkplaceCloseDate({ workplaceCloseDate: event.target.value })}
                           defaultValue={parameter.workplaceCloseDate} id="outlined-basic14"  fullWidth type="date" style={{width: '200px'}} />
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
WorkplaceManagement.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default WorkplaceManagement;