import { useDispatch, useSelector } from 'react-redux';
import { getUserData, getUserID } from '../../service/slices/user.slice';
import styles from './index.module.css';
import { Link, useParams } from 'react-router-dom';
import { UserMenu } from '../menu/menu';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../../service/store';
import { getProfileData } from '../../service/Asyncs/profile';
import { BuildingGear, Gear, Plus, Send, Star } from 'react-bootstrap-icons';
import { TUser } from '@utils-types';
import { Upload, UploadFile } from 'antd';

export const ProfilePage = () => {
  const profileId = Number(useParams().id);
  const getUserId = useSelector(getUserID);
  const userData = useSelector(getUserData);
  const dispatch: AppDispatch = useDispatch();

  const [getProfile, setProfile] = useState<TUser | null>();

  useEffect(() => {
    const queryFunc = async () => {
      const profile = await dispatch(getProfileData({ userId: profileId }));
      if (getProfileData.fulfilled.match(profile)) {
        setProfile(profile.payload);
      } else {
        console.log('error: ' + profile.payload);
      }
    };
    queryFunc();
  }, [dispatch]);

  const [testFile, setTestFile] = useState<FileList | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (testFile && testFile[0]) {
      const file = testFile[0];
      const objectImage = URL.createObjectURL(file);
      setPreviewAvatar(objectImage);
      return () => URL.revokeObjectURL(objectImage);
    }
  }, [testFile]);

  return (
    <div className={styles.body}>
      <UserMenu />
      <div className={styles.contentSection}>
        <div className={styles.headerProfile}>
          <div className={styles.profileInfo}>
            <div
              className={styles.avatarUser}
              style={{ backgroundImage: `url(${previewAvatar})` }}
            />
            <div className={styles.titleProfile}>
              <h1>{getProfile?.name}</h1>
              <h2>{getProfile?.status}</h2>
            </div>
          </div>
          <div className={styles.funcContainer}>
            <input
              type='file'
              onChange={(e) => setTestFile(e.currentTarget.files)}
              name=''
              id=''
              placeholder='change photo'
            />
            <button className={styles.subscribeButton}>
              Подписаться <Star />
            </button>
            <Link to={{ pathname: '/' }}>
              <Send className={styles.IconsProfile} />
            </Link>
            <Link to={{ pathname: '/' }}>
              <Gear className={styles.IconsProfile} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
