import React, { ReactElement,useState } from 'react';
import Layout from '../../layout';
import axios from 'axios';
import { useRouter } from 'next/router';


interface BoardData {
  id: number;
  title: string;
  contents: string;
  writtenBy : string;
  writeDate : string;
  // 추가적으로 필요한 속성이 있다면 여기에 추가
}
// @ts-ignore
export async function getServerSideProps({ query }) {
  const id = query.id
  try {
    const response = await axios.get(`http://localhost:9103/base/selectBoardId?id=${id}`);
    const boardData: BoardData[] = response.data; // 타입 추론을 위한 배열 선언
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
    }
  }
}


function UpdateBoard ({boardData}: { boardData: BoardData[] | null }) {

    const router =useRouter()
    const { id }= router.query
    const [Utitle,setTitle]  = useState('');
    const [Ucontents, setContents] = useState('');

    console.log("아이디의 값은 : "+ id)

    let data = {
      id: id,
      title: Utitle,
      contents: Ucontents,
    }

  const sendUpdate = async () => {
    console.log('전송된 데이터:', data);
    try {
      await axios.post(`http://localhost:9103/base/updateBoard?id=${id}&title=${Utitle}&contents=${Ucontents}`,
        // {
        //   title: Utitle,
        //   contents: Ucontents
        // },
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
    <div>
      {boardData ? boardData.map(entry=>(
    <div style={{ display: 'inline-block', borderStyle: 'solid' }}>
      <h1>게시판 번호 {entry.id}</h1>
      <table>
        <tr>
          <div style={{ width: 1000 }}>
            <td style={{ width: '30%' }}>제목</td>
            <td><input
              defaultValue={entry.title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '200%', marginLeft: 170 }}
              type={'text'} placeholder={'제목을 입력하세요'} />
            </td>
          </div>
        </tr>

        <tr>
          <div style={{ width: 1000, marginTop: 30 }}>
            <td style={{ width: '30%' }}>내용</td>
            <textarea
              defaultValue={entry.contents}
              onChange={(e) => setContents(e.target.value)}
              style={{ resize: 'none', width: 670, height: 200, marginLeft: 320, marginBottom: 30 }}
              placeholder={'내용을 입력하세요'} />
          </div>
        </tr>
      </table>
      <button onClick={sendUpdate}>저장하기</button>
    </div>)):(
      <p>데이터가 전송 중</p>
      )
      }
    </div>
  )

}

UpdateBoard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default UpdateBoard