import React, { ReactElement } from 'react';
import Layout from '../../layout';


import axios from 'axios';

export async function getServerSideProps() {
  try {

    const response = await axios.get('http://localhost:9103/base/boardlist');
    const boardData = response.data; // 가져온 데이터

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

// @ts-ignore
function Attention({ boardData }) {
  const noticeItems = boardData.filter(entry => entry.title.includes('공지사항'));
  return (


    <div>

      {boardData ? (
        <ul>
          {noticeItems.map((board: { id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; contents: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
            <li key={board.id}>
              <h2 style={{color:'red'}}>{board.title}</h2>
              <p>{board.contents}</p>
              {/*<p className="text-gray-500">작성자: {board.writtenBy}</p>*/}
              {/*<p className="text-gray-500">작성일자: {board.writeDate}</p>*/}
              {/*<p className="text-gray-500">최근 수정일자: {board.updateDateTime}</p>*/}
            </li>
          ))}
        </ul>
      ) : (
        <p>게시글을 불러오는 중 오류가 발생했습니다.</p>
      )}
    </div>
  );
}




Attention.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};


export default Attention;




