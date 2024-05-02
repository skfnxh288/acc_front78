import React, {useState} from 'react';
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
} from '@mui/material';

import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import accountApi from 'api/accountApi';
import router from 'next/router';


//CRUD 공장 만들다가 실패함.
const insertWorkplace = () => {
  //나중에 쓸거임


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
  const [workplaceCode,setworkplaceCode] = useState('')
  const [companyCode,setcompanyCode] = useState('')

  //경고
  const [showWarning, setShowWarning] = useState('필수 입력란이 비어있습니다.');
  const go = () => {
    router.push('./WorkplaceManagement');
  }
  const sendInsert = async () => {
    if (!companyCode || !workplaceCode) {
      setShowWarning('데이터가 저장되었습니다.');
      alert(showWarning)
      return;
    }

    const data={
      workplaceCode:workplaceCode.workplaceCode,
      companyCode:companyCode.companyCode,
      workplaceName:workplaceName.workplaceName,
      businessLicense:businessLicense.businessLicense,
      corporationLicence:corporationLicence.corporationLicence,
      workplaceCeoName:workplaceCeoName.workplaceCeoName,
      businessConditions:businessConditions.businessConditions,
      businessItems:businessItems.businessItems,
      workplaceZipCode:workplaceZipCode.workplaceZipCode,
      workplaceBasicAddress:workplaceBasicAddress.workplaceBasicAddress,
      workplaceDetailAddress:workplaceDetailAddress.workplaceDetailAddress,
      workplaceTelNumber:workplaceTelNumber.workplaceTelNumber,
      workplaceFaxNumber:workplaceFaxNumber.workplaceFaxNumber,
      workplaceEstablishDate:workplaceEstablishDate.workplaceEstablishDate,
      workplaceOpenDate:workplaceOpenDate.workplaceOpenDate,
      workplaceCloseDate:workplaceCloseDate.workplaceCloseDate
    }
    console.log('전송된 데이터:', data);
    try {
      await accountApi.post(`http://localhost:9103/operate/registerworkplace`,data)
    }catch (error){
      console.log(error)
    }
    alert(showWarning)
    go();
  }

  {/* 주석처리용 */}
  // @ts-ignore
  return (
    <div>
      <Grid item sm={6} md={8}>
        <SubCard title="사업장 입력">
            <Grid container spacing={gridSpacing}>
              <Grid item md={6} xs={12}>
                <InputLabel>거래처 코드</InputLabel>
                <TextField  onChange={(event) => setworkplaceCode({ workplaceCode: event.target.value })}
                            placeholder={'코드 입력은 필수입니다.'} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>회사코드</InputLabel>
                <TextField onChange={(event) => setcompanyCode({ companyCode: event.target.value })}
                           placeholder={'코드 입력은 필수입니다.'} id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장명</InputLabel>
                <TextField onChange={(event) => setworkplaceName({ workplaceName: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장 등록번호</InputLabel>
                <TextField onChange={(event) => setbusinessLicense({ businessLicense: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>법인 등록번호</InputLabel>
                <TextField onChange={(event) => setcorporationLicence({ corporationLicence: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>대표자명</InputLabel>
                <TextField onChange={(event) => setworkplaceCeoName({ workplaceCeoName: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>업태</InputLabel>
                <TextField onChange={(event) => setbusinessConditions({ businessConditions: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>종목</InputLabel>
                <TextField onChange={(event) => setbusinessItems({ businessItems: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장 우편번호</InputLabel>
                <TextField onChange={(event) => setworkplaceZipCode({ workplaceZipCode: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장 기본주소</InputLabel>
                <TextField onChange={(event) => setworkplaceBasicAddress({ workplaceBasicAddress: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장 세부주소</InputLabel>
                <TextField onChange={(event) => setworkplaceDetailAddress({ workplaceDetailAddress: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장 전화번호</InputLabel>
                <TextField onChange={(event) => setworkplaceTelNumber({ workplaceTelNumber: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장 팩스번호</InputLabel>
                <TextField onChange={(event) => setworkplaceFaxNumber({ workplaceFaxNumber: event.target.value })}
                           id="outlined-basic1" fullWidth style={{width: '200px'}} /> {/* inputRef={familyNameRef} */}
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장개업년월일</InputLabel>
                <TextField onChange={(event) => setworkplaceEstablishDate({ workplaceEstablishDate: event.target.value })}
                           id="outlined-basic14"  fullWidth type="date" style={{width: '200px'}} />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장설립년월일</InputLabel>
                <TextField onChange={(event) => setworkplaceOpenDate({ workplaceOpenDate: event.target.value })}
                           id="outlined-basic14"  fullWidth type="date" style={{width: '200px'}} />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>사업장폐업년월일</InputLabel>
                <TextField onChange={(event) => setworkplaceCloseDate({ workplaceCloseDate: event.target.value })}
                           id="outlined-basic14"  fullWidth type="date" style={{width: '200px'}} />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row">
                  <AnimateButton>
                    <Button
                      sx={{ width: '100px' }}
                      variant="contained"
                      onClick={sendInsert}
                    >
                      입력
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
  insertWorkplace.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default insertWorkplace;