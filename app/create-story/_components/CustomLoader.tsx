import React, { useEffect } from 'react'
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter, useDisclosure} from "@nextui-org/modal";
import Image from 'next/image';


function CustomLoader({isLoading}:any) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    useEffect(()=>{
        onOpen();
    },[])
  return (
    <div>
 {isLoading&& <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Modal Title</ModalHeader>
              <ModalBody className='p-10 flex w-full items-center justify-center'>
               <Image src={'/magic-hat.gif'} alt='loader' width={300} height={300}
               className='w-[200px] h-[200px] '
               />
               <h2 className='font-bold text-2xl text-primary text-center'> Please Wait... Story is generating </h2>
              </ModalBody>
              
            </>
          )}
        </ModalContent>
      </Modal>}
      </div>
  )
}

export default CustomLoader