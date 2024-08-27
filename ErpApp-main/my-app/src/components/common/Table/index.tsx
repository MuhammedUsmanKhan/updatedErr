import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  ChipProps,
  Pagination,
  SortDescriptor,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoChevronDown, IoSearch } from "react-icons/io5";
import { columns } from "./data/index";
import { capitalize } from "./utils/index";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "Product",
  "Quantity",
  "Purchase_Price",
  "Purchase_Date",
  "actions",
];

type InventoryItem = {
  id: number;
  Product: string;
  Quantity: number;
  Purchase_Price: number;
  Purchase_Date: string;
};
//
type PropsType = {
  handleAddInventoryItemModal: () => void;
  handleUpdateInventoryItemModal: (id:number) => void;
  handleDeleteInventoryItemModal: () => void;
  inventoryItems: InventoryItem[]; // Expect inventoryItems as a prop
};

export default function TableNext(props: PropsType) {
  const {
    handleAddInventoryItemModal,
    handleUpdateInventoryItemModal,
    handleDeleteInventoryItemModal,
    inventoryItems,
  } = props;
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<Set<string>>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "Product",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    return columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredItems = [...inventoryItems];

    if (hasSearchFilter) {
      filteredItems = filteredItems.filter((item) =>
        item.Product.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredItems;
  }, [inventoryItems, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: InventoryItem, b: InventoryItem) => {
      const first = a[sortDescriptor.column as keyof InventoryItem];
      const second = b[sortDescriptor.column as keyof InventoryItem];
      const cmp =
        (first as number) < (second as number)
          ? -1
          : (first as number) > (second as number)
          ? 1
          : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (item: InventoryItem, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof InventoryItem];

      switch (columnKey) {
        case "Product":
          return <div>{cellValue}</div>;
        case "Quantity":
          return <div>{cellValue}</div>;
        case "Purchase_Price":
          return <div>{cellValue}</div>;
        case "Purchase_Date":
          return <div>{cellValue}</div>;
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <BsThreeDotsVertical className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem onClick={()=>handleUpdateInventoryItemModal(item.id)}>
                    Edit
                  </DropdownItem>
                  <DropdownItem onClick={handleDeleteInventoryItemModal}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleUpdateInventoryItemModal, handleDeleteInventoryItemModal]
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const onColumnSelectionChange = React.useCallback((keys: Set<string>) => {
    setVisibleColumns(keys);
  }, []);

  const topContent = React.useMemo(
    () => (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<IoSearch />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<IoChevronDown className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Table Columns"
                closeOnSelect={false}
                selectionMode="multiple"
                selectedKeys={Array.from(visibleColumns)}
                onSelectionChange={(selected) => {
                  const selectedKeys = new Set<string>(
                    selected as Iterable<string>
                  );
                  onColumnSelectionChange(selectedKeys);
                }}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              onClick={handleAddInventoryItemModal}
              endContent={<FaPlus />}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {inventoryItems.length} items
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    ),
    [
      filterValue,
      visibleColumns,
      onSearchChange,
      onRowsPerPageChange,
      inventoryItems.length,
      onClear,
      onColumnSelectionChange,
    ]
  );

  const bottomContent = React.useMemo(
    () => (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    ),
    [page, pages, onNextPage, onPreviousPage]
  );

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No items found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
