import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import Input from "../Input";

type PropsType = {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  bottomButtonTitle: string;
  handleInventoryItem: () => void;
  ProductInputref: React.RefObject<HTMLInputElement>;
  QuantityInputref: React.RefObject<HTMLInputElement>;
  PriceInputref: React.RefObject<HTMLInputElement>;
  DateInputref: React.RefObject<HTMLInputElement>;
  //   onOpen:()=> void
};

export default function ModalNext(props: PropsType) {
  const {
    isOpen,
    onOpenChange,
    title,
    bottomButtonTitle,
    handleInventoryItem,
    ProductInputref,
    QuantityInputref,
    PriceInputref,
    DateInputref
  } = props;

  return (
    <div className="flex flex-col gap-2">
      <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <Input
                  ref={ProductInputref}
                  type="text"
                  errorMessage={"Field should not be left empty."}
                />
                <Input
                  ref={QuantityInputref}
                  type="number"
                  errorMessage={"Field should not be left empty."}
                />
                <Input
                  ref={PriceInputref}
                  type="number"
                  errorMessage={"Field should not be left empty."}
                />
                <Input
                  ref={DateInputref}
                  type="date"
                  errorMessage={"Field should not be left empty."}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={handleInventoryItem}
                  onPress={onClose}
                >
                  {bottomButtonTitle}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
