import React, { ReactElement, useState } from 'react';
import Layout from '../../layout';
import axios from 'axios';
import { useRouter } from 'next/router';

//랜더링 전에 id 들고오는 거





export async function getServerSideProps() {
  try {
    const response = await axios.get('http://localhost:9103/base/boardlist');
    let boardData = response.data;

    return {
      props: {
        boardData,
      },
    };
  } catch (error) {
    console.error('게시글 데이터를 가져오는 중 오류 발생:', error);
    return {
      props: {
        boardData: null,
      },
    };
  }
}

//=======================================================================================================


// @ts-ignore
function InsertBoard({ boardData }) {


  // boardData가 배열이 아니라면, 빈 배열로 설정합니다.
  const dataArray = Array.isArray(boardData) ? boardData : [];

  const maxId = dataArray.length === 0 ? 0 : Math.max(...dataArray.map(data => data.id));
  const id  = maxId+1+""

  const [writtenBy,setWrittenBy] = useState('');
  const [title,setTitle]  = useState('');
  const [contents, setContents] = useState('');

  let data = {
    title: title,
    contents: contents,
    writtenBy: writtenBy
  }


  const router = useRouter();
  //다른 기수 님들은 요청에 data 넣어서 보내보세요. 이상하게 안 보내짐;;
  const insertBoard = async () => {
    console.log('전송된 데이터:', data);
    try {
      await axios.post(`http://localhost:9103/base/insertBoard?title=${title}&contents=${contents}&writtenBy=${writtenBy}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        })
      alert("게시글이 등록됨")
      router.push(`./BoardDetail?id=${id}`)


    } catch (error) {
      console.log(error);
      alert("개발자 콘솔에 에러 있음 ㅇㅇ...");
    }


  }








  return (

    <div style={{ display: 'inline-block', borderStyle: 'solid' }}>
      <h1>게시판 번호 {id}</h1>
      <table>
        <tr>
          <div style={{ width: 1000 }}>
            <td style={{ width: '30%' }}>제목</td>
            <td><input
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '200%', marginLeft: 170 }}
              type={'text'} placeholder={'제목을 입력하세요'} />
            </td>
          </div>
        </tr>

        <tr>
          <div style={{ width: 1000, marginTop: 30 }}>
            <td style={{ width: '30%' }}>작성자</td>
            <td>
              <input
                onChange={(e) => setWrittenBy(e.target.value)}
                style={{ width: '200%', marginLeft: 170 }}
                type={'text'} placeholder={'작성자를 입력하세요'} />
            </td>
          </div>
        </tr>

        <tr>
          <div style={{ width: 1000, marginTop: 30 }}>
            <td style={{ width: '30%' }}>내용</td>
            <textarea
              onChange={(e) => setContents(e.target.value)}
              style={{ resize: 'none', width: 670, height: 200, marginLeft: 320, marginBottom: 30 }}
              placeholder={'내용을 입력하세요'} />
          </div>
        </tr>
      </table>
      <button onClick={insertBoard}>저장하기</button>
    </div>
  )
}




InsertBoard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default InsertBoard;