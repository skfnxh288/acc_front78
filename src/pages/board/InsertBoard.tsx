import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layout';
import axios from 'axios';
import Link from 'next/link';
import { Button, Paper, Table, TableBody, TableCell, TableContainer,TableRow,TextField } from '@mui/material';
import accountApi from 'api/accountApi';
import router, { useRouter } from 'next/router';



interface BoardData {
  title: string;
  contents: string;
  writtenBy: string;
}


const insertBoard = ()=> {
  const router = useRouter();

  const[sendTitle, setTitle] = useState('')
  const[sendContents , setContents] = useState('')
  const[sendWrittenBy ,setWrittenBy] = useState('')

  const data = {
    contents:sendContents.sendContents,
    title:sendTitle.sendTitle,
    writtenBy:sendWrittenBy.sendWrittenBy
  }

  const go = () => {
    router.push('./BoardList');
  }
  const InesrtBoard = async () => {
    try {
      await accountApi.post('http://localhost:9103/Board/insertBoard',data)
      console.log("보낸 값" +data)
      alert("게시글이 작성되었습니다.")
    }catch (error) {
      console.log("업데이트 오류"+error)
    }
    go();
  }

  return (
    <div>
      <div  style={{width:900,height:300 , marginTop:30}}>
        <TextField onChange={(event) => setTitle({ sendTitle:event.target.value })}
                   label={'제목'}
                   rows={1} fullWidth={true} multiline={false} placeholder={'제목을 입력해주세요'} ></TextField>

        <TextField style={{marginTop:30}}
                   label={'작성자'}
                   onChange={(event) => setWrittenBy({ sendWrittenBy:event.target.value })}
                   rows={1} fullWidth={true} multiline={false} placeholder={'작성자를 입력해주세요'} ></TextField>

        <TextField onChange={(event) => setContents({ sendContents:event.target.value })}
                   label={'내용'}
                   style={{marginTop:30}} rows={5} fullWidth={true} multiline={true} placeholder={'내용을 입력해주세요'}
        ></TextField>
        <div style={{ marginTop: 10 }}>
        </div>
      </div>
      <Button variant="contained" onClick={InesrtBoard}>저장하기</Button>
    </div>
  );
}

insertBoard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default insertBoard;
