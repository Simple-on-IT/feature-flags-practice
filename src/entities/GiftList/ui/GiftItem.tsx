import React, { useState } from 'react';
import styles from './GiftItem.module.css';
import { useDuplicateGiftMutation, useUpdateGiftMutation } from '@/app/provider/giftsApi';
import { EditGiftForm } from '@/features/EditGiftForm/ui/EditGiftForm';
import { useGetFeaturesQuery } from '@/app/provider/featureFlagsApi';

interface GiftProps {
  id: number;
  name: string;
  description: string;
}

export const GiftItem: React.FC<GiftProps> = ({ id, name, description }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateGift] = useUpdateGiftMutation();
  const [duplicateGift] = useDuplicateGiftMutation();
  const { data: features, } = useGetFeaturesQuery();

  const handleSave = async (updatedName: string, updatedDescription: string) => {
    await updateGift({ id, name: updatedName, description: updatedDescription });
    setIsEditing(false);
  };

  const handleDuplicate = async () => {
    await duplicateGift({ id });
  }

  return (
    <div className={styles.giftItem}>
      {isEditing ? (
        <EditGiftForm
          initialName={name}
          initialDescription={description}
          onSubmit={handleSave}
        />
      ) : (
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
          {features?.edit && <button onClick={() => setIsEditing(true)}>Редактировать</button>}
          {/* <button onClick={handleDuplicate}>Дублировать</button> */}
        </div>
      )}
    </div>
  );
};