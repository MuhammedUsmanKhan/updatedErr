"use client";

import React, { useRef, useState } from "react";
import TableNext from "@/components/common/Table";
import { useDisclosure } from "@nextui-org/react";
import ModalNext from "@/components/common/modal";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";
import { inventoryItems as initialInventoryItems } from "@/components/common/Table/data";

const Inventory = () => {
  const AddInventoryItemModal = useDisclosure();
  const UpdateInventoryItemModal = useDisclosure();
  const DeleteConfirmationModal = useDisclosure();
  const [selectedProductID, setSeletecProductID] = useState<number | null>(
    null
  );
  const handleAddInventoryItemModal = () => {
    AddInventoryItemModal.onOpen();
  };

  const handleUpdateInventoryItemModal = (id: number) => {
    console.log(id);

    setSeletecProductID(id);
    UpdateInventoryItemModal.onOpen();
  };

  const handleDeleteInventoryItemModal = () => {
    DeleteConfirmationModal.onOpen();
  };

  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  //   const [updateInventoryItems, setUpdateInventoryItems] = useState(initialInventoryItems);

  const ProductInputref = useRef<HTMLInputElement>(null);
  const QuantityInputref = useRef<HTMLInputElement>(null);
  const PriceInputref = useRef<HTMLInputElement>(null);
  const DateInputref = useRef<HTMLInputElement>(null);

  const handleAddInventoryItem = () => {
    // console.log(ProductInputref.current?.value)
    if (
      ProductInputref.current?.value &&
      QuantityInputref.current?.value &&
      PriceInputref.current?.value &&
      DateInputref.current?.value != null
    ) {
      const newItem = {
        id: inventoryItems.length + 1,
        Product: ProductInputref.current?.value,
        Quantity: parseFloat(QuantityInputref.current?.value),
        Purchase_Price: parseFloat(PriceInputref.current?.value),
        Purchase_Date: DateInputref.current?.value,
      };
      setInventoryItems([...inventoryItems, newItem]);
    }
  };

  const handleUpdateInventoryItem = () => {
    if (
      ProductInputref.current?.value &&
      QuantityInputref.current?.value &&
      PriceInputref.current?.value &&
      DateInputref.current?.value &&
      selectedProductID != null
    ) {
      const newItem = {
        // id: inventoryItems.length + 1,
        // Product: inventoryItems[selectedProductID].Product,
        // Product: ProductInputref.current?.value,
        ...inventoryItems[selectedProductID],
        Quantity: parseFloat(QuantityInputref.current?.value),
        Purchase_Price: parseFloat(PriceInputref.current?.value),
        Purchase_Date: DateInputref.current?.value,
      };
      // want to update specific inventory item.
      const updatedInventoryItems = inventoryItems.map((item) => {
       return item.id === selectedProductID ? newItem : item
      });
      setInventoryItems(updatedInventoryItems);
    }
  };

  return (
    <>
      <ModalNext
        ProductInputref={ProductInputref}
        QuantityInputref={QuantityInputref}
        PriceInputref={PriceInputref}
        DateInputref={DateInputref}
        title="Add New Product"
        handleInventoryItem={handleAddInventoryItem}
        bottomButtonTitle="Add"
        isOpen={AddInventoryItemModal.isOpen}
        onOpenChange={AddInventoryItemModal.onOpenChange}
      />
      <ModalNext
        ProductInputref={ProductInputref}
        QuantityInputref={QuantityInputref}
        PriceInputref={PriceInputref}
        DateInputref={DateInputref}
        title="Update Product"
        bottomButtonTitle="Update"
        handleInventoryItem={handleUpdateInventoryItem}
        isOpen={UpdateInventoryItemModal.isOpen}
        onOpenChange={UpdateInventoryItemModal.onOpenChange}
      />
      <ConfirmationModal
        isOpen={DeleteConfirmationModal.isOpen}
        onOpenChange={DeleteConfirmationModal.onOpenChange}
      />
      <div className="flex justify-center items-center px-4 flex-1 max-h-full">
        <TableNext
          inventoryItems={inventoryItems}
          handleUpdateInventoryItemModal={handleUpdateInventoryItemModal}
          handleAddInventoryItemModal={handleAddInventoryItemModal}
          handleDeleteInventoryItemModal={handleDeleteInventoryItemModal}
        />
      </div>
    </>
  );
};

export default Inventory;
