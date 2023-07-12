import React from 'react'
import Modal from './Modal';
import Image from 'next/image';

interface ImageModalProps {
    imageSrc: string;
    isOpen: boolean;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
    imageSrc,
    isOpen,
    onClose
}) => {    
    return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-80 h-80">
        <Image 
            className="object-cover" 
            fill 
            alt="Image" 
            src={imageSrc}
        />
        </div>
    </Modal>
    )
}

export default ImageModal