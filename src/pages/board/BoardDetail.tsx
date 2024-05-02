import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layout';
import axios from 'axios';
import Link from 'next/link';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer,TableRow,TextField } from '@mui/material';
import accountApi from 'api/accountApi';
import router, { useRouter } from 'next/router';



function BoardDetail(boardData) {
  const router = useRouter();
  const { id } = router.query;

  const [getBoardData , setBoardData] = useState<any[]>([])
  const [getReplyData , setReplyData]= useState<any[]>([])
  async function Datalist() {
    try {
      const response = await axios.get(`http://localhost:9103/Board/selectBoardId?id=${id}`);
      console.log("받은 데이터"+response.data)
      setBoardData(response.data)
    } catch (error) {
      console.error('게시글 데이터를 가져오는 중 오류 발생:', error);
      return {
        props: {
          boardData: null,
        },
      }
    }
  }

  async function ReplyDatalist() {
    try {
      const response = await axios.get(`http://localhost:9103/Board/selectBoardReplyId?id=${id}`);
      console.log("받은 데이터"+response.data)
      setReplyData(response.data)
    } catch (error) {
      console.error('댓글 데이터를 가져오는 중 오류 발생:', error);
      return {
        props: {
         replyData: null,
        },
      }
    }
  }


  function BoardDelete(id: number) {
    try {
      accountApi.delete(`http://localhost:9103/Board/deleteBoardList/?id=${id}`, {
      });
      alert("게시글 삭제됨");
      go();
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
    }
  }
  function ReplyDelete(replyId: number) {
    try {
      accountApi.delete(`http://localhost:9103/Board/deleteReplyBoardList/?replyId=${replyId}`, {
      });
      alert("게시글 삭제됨");
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
    }
  }

  useEffect(() => {
    Datalist();
    ReplyDatalist();
    console.log("앞에서 보낸"+boardData)
  }, []);


  const[sendTitle, setTitle] = useState('')
  const[sendContents , setContents] = useState('')

  const[sendReplyContents , setReplyContents ] = useState('')
  const[sendReplyWrittenBy , setReplyWrittenBy ] = useState('')

  const data = {
    contents:sendContents.sendContents,
    title:sendTitle.sendTitle,
    id:id
  }

  const replyData = {
    contents:sendReplyContents,
    writtenBy:sendReplyWrittenBy,
    id:id
  }

  const InesrtReply = async () => {
    try {
      await accountApi.post('http://localhost:9103/Board/insertReplyBoard',replyData)
      console.log("보낸 값" +replyData)
      alert("게시글이 작성되었습니다.")
    }catch (error) {
      console.log("업데이트 오류"+error)
    }
  }

  const go = () => {
    router.push('./BoardList');
  }
  const updateBoard = async () => {
    try {
      await accountApi.post('http://localhost:9103/Board/updateBoard' ,data)
      console.log("보낸 값" +data)
      alert("게시글이 수정되었습니다.")
    }catch (error) {
      console.log("업데이트 오류"+error)
    }
    go();
  }

  return (
    <div>
      {getBoardData.map(column => (
        <div key={column.id} style={{display: 'inline-block' }}>
          <h1>{column.title}</h1>
        </div>
      ))}
      {getBoardData ? getBoardData.map(entry => (
        <TableContainer component={Paper} style={{ border: '1px solid gray', width: 950 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align={'left'}>번호</TableCell>
                <TableCell align={'left'}>{entry.id}</TableCell>
                <TableCell align={'center'}>작성자</TableCell>
                <TableCell  align={'center'}>{entry.writtenBy}</TableCell>
                <TableCell align={'right'}>작성일 {(entry.writeDate).substr(0,11)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )): (
        <p>데이터를 가져오는 중...</p>
      )}
      {getBoardData ? (
        getBoardData.map(entry => (
          <div key={entry.id} style={{width:950,height:300 , marginTop:30}}>
            <TextField onChange={(event) => setTitle({ sendTitle:event.target.value })}
                       label={'제목'}
                       defaultValue={entry.title}
                       rows={1} fullWidth={true} multiline={false} placeholder={'제목을 입력해주세요'} ></TextField>
            <TextField onChange={(event) => setContents({ sendContents:event.target.value })}
                       label={'내용'}
                       style={{marginTop:30}} rows={5} fullWidth={true} multiline={true} placeholder={'내용을 입력해주세요'}
                       defaultValue={entry.contents}></TextField>
            <div style={{ marginTop: 10 }}>
              <Link href={`./UpdateBoard?id=${entry.id}`}>
                <Button variant="contained" style={{ marginRight: 10 }} onClick={updateBoard}>수정하기</Button>
              </Link>
              <Button variant="contained" onClick={() => BoardDelete(entry.id)}>삭제하기</Button>
            </div>
          </div>
        ))
      ) : (
        <p>데이터를 가져오는 중...</p>
      )}
      <div>
       <h1>여기에 댓글 작성할거임.</h1>
        <Grid container spacing={1} style={{width:1000}}>
        <Grid item md={8}>
          <TextField onChange={(event) => setReplyContents(event.target.value )}
                     label={'댓글'}
                     fullWidth={true}
                     rows={2}  multiline={true} placeholder={'내용을 입력해주세요'} ></TextField>
        </Grid>
          <Grid item md={2}>
            <TextField onChange={(event) => setReplyWrittenBy(event.target.value)}
                       label={'작성자'}
                       fullWidth={true}
                       rows={2}  multiline={true} placeholder={'내용을 입력해주세요'} ></TextField>
          </Grid>
          <Grid item md={1}>
            <Button style={{width:100,height:70}} variant="contained" onClick={InesrtReply}>댓글 달기</Button>
          </Grid>
        </Grid>
      </div>
      <div style={{marginTop:50}}>
      {getReplyData ? (
        getReplyData.map(entry => (
          <Grid container spacing={1} style={{width:1000,marginTop:10}}>
            <Grid item  md={10}>
              <TableContainer key={entry.id} component={Paper} style={{ border: '1px solid gray'}}>
                <Table>
                  <TableBody>
                    <TableRow >
                      <TableCell align={'left'}>{entry.contents}</TableCell>
                      <TableCell align={'right'}>{entry.writtenBy}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item  md={2}>
              <Button variant="contained" style={{width:100, height:55}} onClick={() => ReplyDelete(entry.replyId)}>삭제하기</Button>
            </Grid>
          </Grid>
        ))
      ) : (
        <p>데이터를 가져오는 중...</p>
      )}
      </div>
    </div>
  );
}

BoardDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default BoardDetail;
