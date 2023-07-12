import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../input/Button";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Modal from "./Modal";
import Input from "../input/Input";

interface SettingModalProps {
  isOpen: boolean;
  currentUser: User;
  onClose: () => void;
}

const SettingModal: React.FC<SettingModalProps> = ({
  isOpen,
  currentUser,
  onClose,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser.image,
    },
  });

   const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result.info.secure_url, { 
      shouldValidate: true 
    });
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/settings', data)
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => toast.error('Something went wrong!'))
    .finally(() => setIsLoading(false));
  }

  return  (
    <Modal isOpen={isOpen} onClose={onClose}>
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 
            className="
              text-base 
              font-semibold 
              leading-7 
              text-gray-900
            "
          >
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Edit your public information.
          </p>

            <h3 className='mt-1 text-sm text-gray-600'>{currentUser?.email}</h3>

          <div className="mt-10 flex flex-col gap-y-8">
            <Input
              disabled={isLoading}
              label="Name" 
              id="name" 
              errors={errors} 
              required 
              register={register}
            />
            <div>
              <label 
                htmlFor="photo" 
                className="
                  block 
                  text-sm 
                  font-medium 
                  leading-6 
                  text-gray-900
                "
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <Image
                  width="48"
                  height="48" 
                  className="rounded-full" 
                  src={image || '/images/placeholder.jpg'}
                  alt="Avatar"
                />
                <CldUploadButton 
                  options={{ maxFiles: 1 }} 
                  onUpload={handleUpload} 
                  uploadPreset='wk0ukflg'
                >
                  <Button
                  label='Change'
                    disabled={isLoading}
                    secondary
                    
              />
                </CldUploadButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        className="
          mt-6 
          flex 
          items-center 
          justify-end 
          gap-x-6
        "
      >
        <Button 
        label='Cancel'
          disabled={isLoading}
          secondary 
          onClick={onClose}
        />
          
        <Button
        label='Save' 
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        />          
      </div>
    </form>
  </Modal>
  )
};

export default SettingModal;
