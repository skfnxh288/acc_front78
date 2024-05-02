import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layout';
import { useRouter } from 'next/router';
import accountApi from 'api/accountApi';
import { baseColumnsProps } from '../account/base/types/types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination } from '@mui/material';

const BoardList = () => {
  const [boardList, setBoardList] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const fetchData = async () => {
    try {
      const response = await accountApi.get('http://localhost:9103/Board/selectBoardList');
      setBoardList(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const router = useRouter();
  function pageNation(id) {
    router.push(`./BoardDetail/?id=${id}`);
  }

  function goInsertBoard() {
    router.push(`./InsertBoard`);
  }

  const columns: baseColumnsProps[] = [
    { id: 'id', label: '번호', minWidth: 50 },
    { id: 'title', label: '제목', minWidth: 100 },
    { id: 'writtenBy', label: '작성자', minWidth: 100 },
    { id: 'writeDate', label: '작성일', minWidth: 100 }
  ];

  return (
    <div>
      {boardList.length > 0 && (
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell sx={{ py: 3 }} key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* dispatch를 통해 가져온 데이터를 사용하여 테이블에 렌더링 */}
              {(rowsPerPage > 0
                  ? boardList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : boardList
              ).map((row: any) => (
                <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={row.id}>
                  {/* 여기서 row.customerCode 등의 속성을 사용하여 원하는 데이터에 접근할 수 있습니다. */}
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} onClick={() => { pageNation(row.id) }}>
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={boardList.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
      <Button variant="contained" onClick={goInsertBoard}> 글 쓰기 </Button>
    </div>
  );
};

BoardList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default BoardList;
