import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from "@mui/material";
import { useState } from "react";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

interface Row {
  id: number;
  symbol: string;
  name: string;
  currency: string;
}

interface Cols {
  symbol: string;
  name: string;
  currency: string;
}

const cols: (keyof Cols)[] = ["symbol", "name", "currency"];

const columnTranslations: { [key in keyof Cols]: string } = {
  symbol: "Símbolo",
  name: "Nombre",
  currency: "Moneda",
};

const TableComponent = ({ stocks }: { stocks: Row[] }) => {
  const [sortColumn, setSortColumn] = useState<keyof Row | "">("symbol");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column: keyof Row) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedStocks = [...stocks];
  if (sortColumn) {
    sortedStocks.sort((a: Row, b: Row) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedStocks = sortedStocks.slice(startIndex, endIndex);

  const getSortIcon = (column: keyof Row) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? <ArrowUpward /> : <ArrowDownward />;
    }
    return null;
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: "30px", height:"600px" }}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {cols.map((col: keyof Cols) => (
                <TableCell key={col}>
                  <Button
                    variant="text"
                    onClick={() => handleSort(col)}
                    sx={{ fontWeight: sortColumn === col ? "bold" : "normal", textTransform: "none" }}
                    endIcon={getSortIcon(col)}
                  >
                    {columnTranslations[col]}
                  </Button>
                </TableCell>
              ))}
              <TableCell key="actions">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStocks.map((row: Row) => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                {cols.map((col: keyof Row) => (
                  <TableCell key={col}>{row[col]}</TableCell>
                ))}
                <TableCell>
                  <Button variant="text" onClick={() => console.log(row.id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={stocks.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Acciones por página"
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableComponent;
