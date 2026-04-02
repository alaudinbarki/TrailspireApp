import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect } from 'react-native-svg';

type TabMode = 'collections' | 'gpx';

type CollectionItem = {
  id: string;
  title: string;
  count: number;
  starred?: boolean;
  privacy: 'Shared library' | 'Private';
  images: [any, any, any];
  collaborators?: any[];
};

const STAR_PATH_D = 'M7.62233 0.375792C7.36776 -0.125264 6.63224 -0.125264 6.37767 0.375792L4.75218 3.57516C4.6511 3.77413 4.45569 3.91204 4.22965 3.94395L0.59496 4.45699C0.0257289 4.53734 -0.201562 5.21686 0.210338 5.60688L2.84042 8.09724C3.00399 8.25212 3.07863 8.47526 3.04001 8.69395L2.41913 12.2104C2.3219 12.7611 2.91696 13.1811 3.42609 12.9211L6.67705 11.2608C6.87923 11.1576 7.12077 11.1576 7.32295 11.2608L10.5739 12.9211C11.083 13.1811 11.6781 12.7611 11.5809 12.2104L10.96 8.69395C10.9214 8.47526 10.996 8.25212 11.1596 8.09724L13.7897 5.60688C14.2016 5.21686 13.9743 4.53734 13.405 4.45699L9.77035 3.94395C9.54431 3.91204 9.3489 3.77413 9.24782 3.57516L7.62233 0.375792Z';

function CollectionStarIcon({ filled }: { filled: boolean }) {
  return (
    <Svg width={14} height={13} viewBox="0 0 14 13" fill="none" style={styles.titleStarIcon}>
      <Path
        d={STAR_PATH_D}
        fill={filled ? '#1F1F1F' : 'none'}
        stroke="#1F1F1F"
        strokeWidth={1}
      />
    </Svg>
  );
}

const COLLECTIONS: CollectionItem[] = [
  {
    id: '1',
    title: 'Skitouring Switzerland',
    count: 11,
    starred: true,
    privacy: 'Shared library',
    images: [
      require('../assets/images/feed/collection_preview_2.png'),
      require('../assets/images/feed/collection_preview_1.png'),
      require('../assets/images/feed/collection_preview_2.png'),
    ],
    collaborators: [
      require('../assets/images/feed/friend_avatar_andyros.png'),
      require('../assets/images/feed/friend_rowbat88.png'),
      require('../assets/images/feed/friend_jhonny.png'),
      require('../assets/images/feed/profile_photo2.png'),
    ],
  },
  {
    id: '2',
    title: 'Solo Rides',
    count: 6,
    starred: false,
    privacy: 'Private',
    images: [
      require('../assets/images/feed/collection_preview_1.png'),
      require('../assets/images/feed/collection_preview_2.png'),
      require('../assets/images/feed/collection_preview_1.png'),
    ],
  },
  {
    id: '3',
    title: 'Zurich',
    count: 88,
    starred: true,
    privacy: 'Shared library',
    images: [
      require('../assets/images/feed/collection_preview_2.png'),
      require('../assets/images/feed/collection_preview_1.png'),
      require('../assets/images/feed/collection_preview_2.png'),
    ],
    collaborators: [
      require('../assets/images/feed/friend_avatar_andyros.png'),
      require('../assets/images/feed/friend_rowbat88.png'),
      require('../assets/images/feed/friend_jhonny.png'),
      require('../assets/images/feed/profile_photo2.png'),
    ],
  },
  {
    id: '4',
    title: 'Skitouring Dolomites',
    count: 11,
    starred: false,
    privacy: 'Private',
    images: [
      require('../assets/images/feed/collection_preview_1.png'),
      require('../assets/images/feed/collection_preview_2.png'),
      require('../assets/images/feed/collection_preview_1.png'),
    ],
  },
];

export default function SavedCollectionsScreen() {
  const router = useRouter();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState<TabMode>('collections');
  const [showMenu, setShowMenu] = useState(false);
  const [activeCardMenu, setActiveCardMenu] = useState<{ id: string; x: number; y: number } | null>(null);
  const responsiveSvgWidth = Math.min(screenWidth - 34, 350);
  const responsiveSvgHeight = (responsiveSvgWidth * 40) / 350;
  const cardMenuLeft = activeCardMenu
    ? Math.min(Math.max(17, activeCardMenu.x - 196), screenWidth - 224 - 17)
    : 17;
  const cardMenuTop = activeCardMenu
    ? Math.min(Math.max(110, activeCardMenu.y + 8), screenHeight - 148 - 24)
    : 110;

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.topActionsRow}>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.8} onPress={() => setShowMenu((prev) => !prev)}>
          <Text style={styles.moreText}>⋯</Text>
        </TouchableOpacity>

        <View style={styles.centerButton}>
          <View style={styles.centerButtonContent}>
            <TextInput
              style={styles.centerButtonInput}
              placeholder="Search"
              placeholderTextColor="#8C8C8C"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.iconButton} activeOpacity={0.8} onPress={() => router.push('/explore-results')}>
          <Svg width={25} height={16} viewBox="0 0 25 16" fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.04545 1.38235C0.744208 1.38235 0.5 1.18483 0.5 0.941176C0.5 0.697521 0.744208 0.5 1.04545 0.5L23.9545 0.500002C24.2558 0.500002 24.5 0.697523 24.5 0.941178C24.5 1.18483 24.2558 1.38235 23.9545 1.38235L1.04545 1.38235ZM6.5 8C6.5 8.24365 6.74421 8.44118 7.04545 8.44118H17.9545C18.2558 8.44118 18.5 8.24365 18.5 8C18.5 7.75634 18.2558 7.55882 17.9545 7.55882H7.04545C6.74421 7.55882 6.5 7.75634 6.5 8ZM3.77273 15.0588C3.77273 14.8152 4.01694 14.6176 4.31818 14.6176L20.6818 14.6176C20.9831 14.6176 21.2273 14.8152 21.2273 15.0588C21.2273 15.3025 20.9831 15.5 20.6818 15.5L4.31818 15.5C4.01694 15.5 3.77273 15.3025 3.77273 15.0588Z"
              fill="black"
              stroke="#1F1F1F"
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <View style={styles.switchRow}>
        <TouchableOpacity
          style={[styles.switchButton, activeTab === 'collections' && styles.switchButtonActive]}
          activeOpacity={0.8}
          onPress={() => setActiveTab('collections')}
        >
          <Text style={[styles.switchText, activeTab === 'collections' && styles.switchTextActive]}>Collections</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, activeTab === 'gpx' && styles.switchButtonActive]}
          activeOpacity={0.8}
          onPress={() => setActiveTab('gpx')}
        >
          <Text style={[styles.switchText, activeTab === 'gpx' && styles.switchTextActive]}>GPX</Text>
        </TouchableOpacity>
      </View>

      {showMenu && (
        <>
          <Pressable style={styles.menuBackdrop} onPress={() => setShowMenu(false)} />
          <View style={styles.popupMenu}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
              <Text style={styles.menuText}>Select</Text>
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM9.57495 13.0486C9.58189 13.0422 9.58869 13.0357 9.59536 13.029L15.0193 7.60527C15.1968 7.42772 15.1968 7.13988 15.0193 6.96233C14.8417 6.78478 14.5539 6.78478 14.3764 6.96233L9.23374 12.105L5.6982 8.56941C5.52065 8.39186 5.23281 8.39186 5.05526 8.56941C4.87771 8.74696 4.87771 9.0348 5.05526 9.21235L8.91228 13.0694C9.08983 13.2469 9.37766 13.2469 9.55521 13.0694C9.56207 13.0625 9.56865 13.0555 9.57495 13.0486Z"
                  fill="#F2F2F2"
                />
              </Svg>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
              <Text style={styles.menuText}>Create New</Text>
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM5 10C5 9.72386 5.22386 9.5 5.5 9.5H9.5V5.5C9.5 5.22386 9.72386 5 10 5C10.2761 5 10.5 5.22386 10.5 5.5V9.5H14.5C14.7761 9.5 15 9.72386 15 10C15 10.2761 14.7761 10.5 14.5 10.5H10.5V14.5C10.5 14.7761 10.2761 15 10 15C9.72386 15 9.5 14.7761 9.5 14.5V10.5H5.5C5.22386 10.5 5 10.2761 5 10Z"
                  fill="#F2F2F2"
                />
              </Svg>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
              <Text style={styles.menuText}>Archived</Text>
              <View style={styles.menuIconSpacer} />
            </TouchableOpacity>
          </View>
        </>
      )}

      {activeCardMenu && (
        <>
          <Pressable style={styles.menuBackdrop} onPress={() => setActiveCardMenu(null)} />
          <View style={[styles.cardPopupMenu, { left: cardMenuLeft, top: cardMenuTop }]}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.8} onPress={() => setActiveCardMenu(null)}>
              <Text style={styles.menuText}>Rename</Text>
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.8446 1.27803L15.0353 2.08728L17.9127 4.96466L18.722 4.15541C19.0696 3.80779 19.0696 3.24418 18.722 2.89655L17.1034 1.27803C16.7558 0.930403 16.1922 0.930403 15.8446 1.27803ZM1.59261 15.53L14.316 2.80662L17.1934 5.68401L10.8317 12.0457L4.47 18.4074C4.32391 18.5535 4.13155 18.6442 3.9259 18.664L1.05999 18.94L1.336 16.0741C1.3558 15.8684 1.44652 15.6761 1.59261 15.53ZM0.873267 14.8107C0.560219 15.1237 0.365812 15.5359 0.323372 15.9766L0.00300142 19.3032C-0.0353281 19.7012 0.298848 20.0353 0.696843 19.997L4.02342 19.6766C4.4641 19.6342 4.8763 19.4398 5.18934 19.1267L19.4413 4.87476C20.1862 4.12985 20.1862 2.92212 19.4413 2.17721L17.8228 0.55868C17.0779 -0.186227 15.8701 -0.186227 15.1252 0.55868L0.873267 14.8107Z"
                  fill="#FCFCFC"
                />
              </Svg>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.8} onPress={() => setActiveCardMenu(null)}>
              <Text style={styles.menuText}>Collaborate</Text>
              <Svg width={20} height={20} viewBox="0 0 19 20" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 0.909091C4.97923 0.909091 0.909091 4.97923 0.909091 10C0.909091 12.047 1.58562 13.9359 2.72727 15.4554V15C2.72727 12.7407 4.55884 10.9091 6.81818 10.9091H9.54545C10.6134 10.9091 11.5858 11.3183 12.3143 11.9885C12.5597 11.8773 12.8281 11.8182 13.1026 11.8182H15.9938C16.9718 11.8182 17.9136 12.1684 18.6518 12.7993C18.9369 11.9175 19.0909 10.9767 19.0909 10C19.0909 4.97923 15.0208 0.909091 10 0.909091ZM18.2996 13.7151L18.2437 13.6592C17.6469 13.0625 16.8376 12.7273 15.9938 12.7273H13.1026C13.0529 12.7273 13.0035 12.731 12.9548 12.7383C13.3855 13.3861 13.6364 14.1638 13.6364 15V18.3345C15.7072 17.4297 17.3758 15.7757 18.2996 13.7151ZM10 19.0909C7.52232 19.0909 5.27614 18.0997 3.63636 16.4922V15C3.63636 13.2427 5.06091 11.8182 6.81818 11.8182H9.54545C11.3027 11.8182 12.7273 13.2427 12.7273 15V18.6747C11.8663 18.9451 10.9502 19.0909 10 19.0909ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM8.63636 3.63636H7.72727C6.72312 3.63636 5.90909 4.45039 5.90909 5.45455V7.27273C5.90909 8.27688 6.72312 9.09091 7.72727 9.09091H8.63636C9.64052 9.09091 10.4545 8.27688 10.4545 7.27273V5.45455C10.4545 4.45039 9.64052 3.63636 8.63636 3.63636ZM7.72727 2.72727C6.22104 2.72727 5 3.94831 5 5.45455V7.27273C5 8.77896 6.22104 10 7.72727 10H8.63636C10.1426 10 11.3636 8.77896 11.3636 7.27273V5.45455C11.3636 3.94831 10.1426 2.72727 8.63636 2.72727H7.72727ZM15.9091 8.18182V9.09091C15.9091 9.59299 15.5021 10 15 10C14.4979 10 14.0909 9.59299 14.0909 9.09091V8.18182C14.0909 7.67974 14.4979 7.27273 15 7.27273C15.5021 7.27273 15.9091 7.67974 15.9091 8.18182ZM13.1818 8.18182C13.1818 7.17767 13.9958 6.36364 15 6.36364C16.0042 6.36364 16.8182 7.17766 16.8182 8.18182V9.09091C16.8182 10.0951 16.0042 10.9091 15 10.9091C13.9958 10.9091 13.1818 10.0951 13.1818 9.09091V8.18182Z"
                  fill="#F2F2F2"
                />
              </Svg>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.8} onPress={() => setActiveCardMenu(null)}>
              <Text style={[styles.menuText, { color: "red" }]}>Delete</Text>

            </TouchableOpacity>
          </View>
        </>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        <View style={styles.svgRowWrapper}>
          <Svg width={responsiveSvgWidth} height={responsiveSvgHeight} viewBox="0 0 350 40" fill="none">
            <Rect x={273.07} width={76} height={40} rx={15} fill="#1F1F1F" />
            <Path
              d="M4.70654 26.2988C3.77686 26.2988 2.96891 26.1549 2.28271 25.8672C1.60205 25.5794 1.06527 25.1782 0.672363 24.6636C0.27946 24.1489 0.0581055 23.5485 0.00830078 22.8623L0 22.7461H2.0752L2.0835 22.8291C2.1167 23.1667 2.24951 23.46 2.48193 23.709C2.71989 23.958 3.03532 24.1545 3.42822 24.2983C3.82113 24.4367 4.26937 24.5059 4.77295 24.5059C5.25439 24.5059 5.6805 24.4312 6.05127 24.2817C6.42204 24.1323 6.71257 23.9276 6.92285 23.6675C7.13314 23.4019 7.23828 23.0975 7.23828 22.7544V22.7461C7.23828 22.3145 7.0695 21.9631 6.73193 21.6919C6.39437 21.4152 5.83822 21.1938 5.06348 21.0278L3.77686 20.7622C2.54834 20.5021 1.65462 20.0871 1.0957 19.5171C0.542318 18.9416 0.265625 18.2083 0.265625 17.3174V17.3091C0.265625 16.5952 0.453776 15.9699 0.830078 15.4331C1.21191 14.8963 1.73486 14.4785 2.39893 14.1797C3.06852 13.8753 3.83496 13.7231 4.69824 13.7231C5.58366 13.7231 6.3501 13.8726 6.99756 14.1714C7.64502 14.4647 8.15413 14.8659 8.5249 15.375C8.89567 15.8841 9.10319 16.4596 9.14746 17.1016L9.15576 17.2095H7.11377L7.09717 17.1099C7.04736 16.7944 6.91732 16.5205 6.70703 16.2881C6.50228 16.0501 6.22835 15.862 5.88525 15.7236C5.54215 15.5853 5.14095 15.5161 4.68164 15.5161C4.24447 15.5161 3.85433 15.5853 3.51123 15.7236C3.16813 15.8564 2.89697 16.0446 2.69775 16.2881C2.50407 16.5316 2.40723 16.8249 2.40723 17.168V17.1763C2.40723 17.5968 2.57048 17.9455 2.89697 18.2222C3.229 18.4989 3.76855 18.7147 4.51562 18.8696L5.80225 19.1436C6.64339 19.3206 7.32682 19.5558 7.85254 19.8491C8.37826 20.1424 8.76286 20.5076 9.00635 20.9448C9.25537 21.3765 9.37988 21.8966 9.37988 22.5054V22.5137C9.37988 23.2884 9.18896 23.958 8.80713 24.5225C8.43083 25.0869 7.89128 25.5241 7.18848 25.834C6.49121 26.1439 5.6639 26.2988 4.70654 26.2988ZM13.9619 26.1494C13.3919 26.1494 12.88 26.0387 12.4263 25.8174C11.978 25.596 11.6239 25.2834 11.3638 24.8794C11.1092 24.4699 10.9819 23.9884 10.9819 23.4351V23.4185C10.9819 22.8817 11.1147 22.4196 11.3804 22.0322C11.646 21.6393 12.0361 21.3322 12.5508 21.1108C13.0654 20.8895 13.6908 20.7594 14.4268 20.7207L17.7803 20.5132V21.8745L14.7173 22.0737C14.1362 22.1069 13.7074 22.2287 13.4307 22.439C13.154 22.6493 13.0156 22.9425 13.0156 23.3188V23.3354C13.0156 23.7228 13.1623 24.0244 13.4556 24.2402C13.7544 24.4561 14.1335 24.564 14.5928 24.564C15.0078 24.564 15.3786 24.481 15.7051 24.3149C16.0316 24.1489 16.2889 23.9248 16.4771 23.6426C16.6652 23.3548 16.7593 23.0311 16.7593 22.6714V19.7993C16.7593 19.3455 16.6154 18.9997 16.3276 18.7617C16.0399 18.5182 15.6138 18.3965 15.0493 18.3965C14.5789 18.3965 14.1943 18.4795 13.8955 18.6455C13.5967 18.806 13.3947 19.0356 13.2896 19.3345L13.2812 19.3677H11.3306L11.3389 19.293C11.4053 18.7839 11.6045 18.3384 11.9365 17.9565C12.2686 17.5747 12.7085 17.2786 13.2563 17.0684C13.8042 16.8581 14.4351 16.7529 15.1489 16.7529C15.9347 16.7529 16.5988 16.8747 17.1411 17.1182C17.6834 17.3561 18.0957 17.7048 18.3779 18.1641C18.6602 18.6178 18.8013 19.1629 18.8013 19.7993V26H16.7593V24.7549H16.6182C16.4521 25.0426 16.2363 25.2917 15.9707 25.502C15.7106 25.7122 15.4118 25.8727 15.0742 25.9834C14.7367 26.0941 14.3659 26.1494 13.9619 26.1494ZM23.4414 26L20.2124 16.9272H22.4204L24.5122 23.9829H24.6616L26.7451 16.9272H28.9199L25.6992 26H23.4414ZM34.1826 26.1826C33.2806 26.1826 32.5059 25.9917 31.8584 25.6099C31.2165 25.228 30.7212 24.6857 30.3726 23.9829C30.0239 23.2801 29.8496 22.4473 29.8496 21.4844V21.4761C29.8496 20.5243 30.0212 19.6942 30.3643 18.9858C30.7129 18.2775 31.2054 17.7297 31.8418 17.3423C32.4782 16.9494 33.2253 16.7529 34.083 16.7529C34.9463 16.7529 35.6878 16.9438 36.3076 17.3257C36.9329 17.702 37.4144 18.2305 37.752 18.9111C38.0895 19.5918 38.2583 20.3887 38.2583 21.3018V21.9824H30.8872V20.5962H37.2456L36.2661 21.8911V21.0693C36.2661 20.4661 36.1748 19.9653 35.9922 19.5669C35.8096 19.1685 35.555 18.8696 35.2285 18.6704C34.9076 18.4712 34.534 18.3716 34.1079 18.3716C33.6818 18.3716 33.3027 18.4767 32.9707 18.687C32.6442 18.8918 32.3841 19.1961 32.1904 19.6001C32.0023 19.9985 31.9082 20.4883 31.9082 21.0693V21.8994C31.9082 22.4583 32.0023 22.937 32.1904 23.3354C32.3786 23.7284 32.6442 24.0327 32.9873 24.2485C33.3359 24.4588 33.7482 24.564 34.2241 24.564C34.5949 24.564 34.9131 24.5114 35.1787 24.4062C35.4499 24.2956 35.6685 24.1655 35.8345 24.0161C36.0005 23.8612 36.1167 23.7145 36.1831 23.5762L36.208 23.5181H38.167L38.1504 23.5928C38.0785 23.8861 37.9456 24.1849 37.752 24.4893C37.5638 24.7881 37.3065 25.0675 36.98 25.3276C36.659 25.5822 36.2661 25.7897 35.8013 25.9502C35.3364 26.1051 34.7969 26.1826 34.1826 26.1826ZM43.5957 26.1494C42.8431 26.1494 42.1873 25.9613 41.6284 25.585C41.0695 25.2031 40.6379 24.6608 40.3335 23.958C40.0291 23.2552 39.877 22.4279 39.877 21.4761V21.4595C39.877 20.4966 40.0264 19.6665 40.3252 18.9692C40.6296 18.2664 41.0584 17.7269 41.6118 17.3506C42.1707 16.9688 42.832 16.7778 43.5957 16.7778C44.0107 16.7778 44.3981 16.8442 44.7578 16.9771C45.1175 17.1043 45.4329 17.2869 45.7041 17.5249C45.9808 17.7629 46.1966 18.0451 46.3516 18.3716H46.501V13.416H48.5596V26H46.501V24.5806H46.3516C46.1855 24.9071 45.967 25.1893 45.6958 25.4272C45.4302 25.6597 45.1203 25.8395 44.7661 25.9668C44.4119 26.0885 44.0218 26.1494 43.5957 26.1494ZM44.2432 24.4062C44.7135 24.4062 45.1175 24.29 45.4551 24.0576C45.7982 23.8197 46.061 23.4821 46.2437 23.0449C46.4318 22.6022 46.5259 22.0793 46.5259 21.4761V21.4595C46.5259 20.8507 46.4318 20.3278 46.2437 19.8906C46.061 19.4535 45.7982 19.1159 45.4551 18.8779C45.1175 18.64 44.7135 18.521 44.2432 18.521C43.7783 18.521 43.3743 18.64 43.0312 18.8779C42.6937 19.1104 42.4336 19.4479 42.251 19.8906C42.0684 20.3278 41.9771 20.8507 41.9771 21.4595V21.4761C41.9771 22.0848 42.0684 22.6077 42.251 23.0449C42.4336 23.4821 42.6937 23.8197 43.0312 24.0576C43.3688 24.29 43.7728 24.4062 44.2432 24.4062Z"
              fill="black"
            />
            <Path
              d="M285.075 22.1069V20.231H294.222V22.1069H285.075ZM288.71 25.7012V16.6367H290.586V25.7012H288.71ZM301.236 26V14.022H303.096L309.521 23.0283L308.043 22.2729H309.114V14.022H311.172V26H309.321L302.896 16.9854L304.374 17.7407H303.303V26H301.236ZM317.805 26.1826C316.903 26.1826 316.128 25.9917 315.48 25.6099C314.839 25.228 314.343 24.6857 313.995 23.9829C313.646 23.2801 313.472 22.4473 313.472 21.4844V21.4761C313.472 20.5243 313.643 19.6942 313.986 18.9858C314.335 18.2775 314.827 17.7297 315.464 17.3423C316.1 16.9494 316.847 16.7529 317.705 16.7529C318.568 16.7529 319.31 16.9438 319.93 17.3257C320.555 17.702 321.036 18.2305 321.374 18.9111C321.712 19.5918 321.88 20.3887 321.88 21.3018V21.9824H314.509V20.5962H320.868L319.888 21.8911V21.0693C319.888 20.4661 319.797 19.9653 319.614 19.5669C319.432 19.1685 319.177 18.8696 318.851 18.6704C318.53 18.4712 318.156 18.3716 317.73 18.3716C317.304 18.3716 316.925 18.4767 316.593 18.687C316.266 18.8918 316.006 19.1961 315.812 19.6001C315.624 19.9985 315.53 20.4883 315.53 21.0693V21.8994C315.53 22.4583 315.624 22.937 315.812 23.3354C316.001 23.7284 316.266 24.0327 316.609 24.2485C316.958 24.4588 317.37 24.564 317.846 24.564C318.217 24.564 318.535 24.5114 318.801 24.4062C319.072 24.2956 319.291 24.1655 319.457 24.0161C319.623 23.8612 319.739 23.7145 319.805 23.5762L319.83 23.5181H321.789L321.772 23.5928C321.701 23.8861 321.568 24.1849 321.374 24.4893C321.186 24.7881 320.929 25.0675 320.602 25.3276C320.281 25.5822 319.888 25.7897 319.423 25.9502C318.958 26.1051 318.419 26.1826 317.805 26.1826ZM325.583 26L323.117 16.9272H325.192L326.695 23.7505H326.844L328.587 16.9272H330.555L332.306 23.7505H332.456L333.958 16.9272H336.008L333.543 26H331.385L329.617 19.4258H329.476L327.716 26H325.583Z"
              fill="#F2F2F7"
            />
          </Svg>
        </View>

        {activeTab === 'collections' ? (
          <View style={styles.cardsList}>
            {COLLECTIONS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                activeOpacity={0.9}
                onPress={() => router.push('/collection-detail-feed')}
              >
                <View style={styles.cardLeftCollage}>
                  <Image source={item.images[0]} style={styles.imageTopLeft} resizeMode="cover" />
                  <Image source={item.images[1]} style={styles.imageTopRight} resizeMode="cover" />
                  <Image source={item.images[2]} style={styles.imageBottomLeft} resizeMode="cover" />
                </View>

                <View style={styles.cardRightInfo}>
                  <View style={styles.titleRow}>
                    <Text style={styles.cardTitle}>{item.title} {item.count}</Text>
                    <CollectionStarIcon filled={Boolean(item.starred)} />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={(event) => {
                        setShowMenu(false);
                        setActiveCardMenu({
                          id: item.id,
                          x: event.nativeEvent.pageX,
                          y: event.nativeEvent.pageY,
                        });
                      }}
                    >
                      <Text style={styles.moreText}>⋯</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.footerRow}>
                    {item.collaborators && item.collaborators.length > 0 ? (<Svg width={15} height={15} viewBox="0 0 19 20" fill="none">
                      <Path d="M14.2496 6.59172C14.2258 6.59172 14.21 6.59172 14.1863 6.59172H14.1467C12.6504 6.54172 11.5342 5.32505 11.5342 3.82505C11.5342 2.29172 12.7217 1.05005 14.1704 1.05005C15.6192 1.05005 16.8067 2.30005 16.8067 3.82505C16.7988 5.33338 15.6825 6.55005 14.2575 6.60005C14.2575 6.59172 14.2575 6.59172 14.2496 6.59172ZM14.1704 2.29172C13.3708 2.29172 12.7217 2.97505 12.7217 3.81672C12.7217 4.64172 13.3313 5.30839 14.115 5.34172C14.1229 5.33339 14.1863 5.33339 14.2575 5.34172C15.0254 5.30006 15.6192 4.63339 15.6271 3.81672C15.6271 2.97505 14.9779 2.29172 14.1704 2.29172Z" fill="#007AFF" />
                      <Path d="M14.2581 12.7334C13.9493 12.7334 13.6406 12.7084 13.3318 12.65C13.0072 12.5917 12.7935 12.2667 12.8489 11.925C12.9043 11.5834 13.2131 11.3584 13.5376 11.4167C14.5114 11.5917 15.5406 11.4 16.2293 10.9167C16.6014 10.6584 16.7993 10.3334 16.7993 10.0084C16.7993 9.68337 16.5935 9.3667 16.2293 9.10837C15.5406 8.62504 14.4956 8.43337 13.5139 8.61671C13.1893 8.68337 12.8806 8.45004 12.8251 8.10837C12.7697 7.76671 12.9835 7.44171 13.3081 7.38338C14.5985 7.14171 15.9364 7.40004 16.8864 8.0667C17.5831 8.55837 17.9868 9.25837 17.9868 10.0084C17.9868 10.75 17.591 11.4584 16.8864 11.9584C16.166 12.4584 15.2318 12.7334 14.2581 12.7334Z" fill="#007AFF" />
                      <Path d="M4.72613 6.59163C4.71822 6.59163 4.7103 6.59163 4.7103 6.59163C3.2853 6.54163 2.16905 5.32496 2.16113 3.82496C2.16113 2.29162 3.34863 1.04163 4.79738 1.04163C6.24613 1.04163 7.43363 2.29163 7.43363 3.81663C7.43363 5.32496 6.31738 6.54163 4.89238 6.59163L4.72613 5.96663L4.78155 6.59163C4.76572 6.59163 4.74197 6.59163 4.72613 6.59163ZM4.8053 5.34163C4.8528 5.34163 4.89238 5.34162 4.93988 5.34996C5.64447 5.31662 6.26197 4.64996 6.26197 3.82496C6.26197 2.98329 5.6128 2.29995 4.81322 2.29995C4.01363 2.29995 3.36447 2.98329 3.36447 3.82496C3.36447 4.64162 3.96613 5.29996 4.73405 5.34996C4.74197 5.34162 4.77363 5.34163 4.8053 5.34163Z" fill="#007AFF" />
                      <Path d="M4.71801 12.7334C3.74426 12.7334 2.81009 12.4584 2.08967 11.9584C1.39301 11.4667 0.989258 10.7584 0.989258 10.0084C0.989258 9.26671 1.39301 8.55837 2.08967 8.0667C3.03967 7.40004 4.37759 7.14171 5.66801 7.38338C5.99259 7.44171 6.20634 7.76671 6.15093 8.10837C6.09551 8.45004 5.78676 8.68337 5.46218 8.61671C4.48051 8.43337 3.44343 8.62504 2.74676 9.10837C2.37468 9.3667 2.17676 9.68337 2.17676 10.0084C2.17676 10.3334 2.38259 10.6584 2.74676 10.9167C3.43551 11.4 4.46467 11.5917 5.43842 11.4167C5.76301 11.3584 6.07176 11.5917 6.12718 11.925C6.18259 12.2667 5.96884 12.5917 5.64426 12.65C5.33551 12.7084 5.02676 12.7334 4.71801 12.7334Z" fill="#007AFF" />
                      <Path d="M9.4996 12.8167C9.47585 12.8167 9.46001 12.8167 9.43626 12.8167H9.39668C7.90043 12.7667 6.78418 11.55 6.78418 10.05C6.78418 8.51669 7.97168 7.27502 9.42043 7.27502C10.8692 7.27502 12.0567 8.52503 12.0567 10.05C12.0488 11.5584 10.9325 12.775 9.50751 12.825C9.50751 12.8167 9.50751 12.8167 9.4996 12.8167ZM9.42043 8.5167C8.62085 8.5167 7.97168 9.20003 7.97168 10.0417C7.97168 10.8667 8.58126 11.5334 9.36501 11.5667C9.37293 11.5584 9.43626 11.5584 9.50751 11.5667C10.2754 11.525 10.8692 10.8584 10.8771 10.0417C10.8771 9.20836 10.2279 8.5167 9.42043 8.5167Z" fill="#007AFF" />
                      <Path d="M9.49936 18.9666C8.54936 18.9666 7.59936 18.7083 6.86311 18.1833C6.16644 17.6916 5.7627 16.9916 5.7627 16.2416C5.7627 15.4999 6.15853 14.7833 6.86311 14.2916C8.34353 13.2583 10.6631 13.2583 12.1356 14.2916C12.8323 14.7833 13.236 15.4833 13.236 16.2333C13.236 16.9749 12.8402 17.6916 12.1356 18.1833C11.3994 18.6999 10.4494 18.9666 9.49936 18.9666ZM7.5202 15.3416C7.14811 15.5999 6.9502 15.9249 6.9502 16.2499C6.9502 16.5749 7.15603 16.8916 7.5202 17.1499C8.58895 17.9083 10.4019 17.9083 11.4706 17.1499C11.8427 16.8916 12.0406 16.5666 12.0406 16.2416C12.0406 15.9166 11.8348 15.5999 11.4706 15.3416C10.4098 14.5833 8.59686 14.5916 7.5202 15.3416Z" fill="#007AFF" />
                    </Svg>) :
                      <Svg width={17} height={18} viewBox="0 0 17 18" fill="none" style={styles.lockPill}>
                        <Path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.56579 6.23864C2.56579 3.35797 5.1107 1.02273 8.25 1.02273C11.3893 1.02273 13.9342 3.35797 13.9342 6.23864V7.98521C13.8648 7.97995 13.7946 7.97727 13.7237 7.97727H2.77632C2.70542 7.97727 2.63521 7.97995 2.56579 7.98521V6.23864ZM1.72368 8.18747V6.23864C1.72368 2.9312 4.64562 0.25 8.25 0.25C11.8544 0.25 14.7763 2.9312 14.7763 6.23864V8.18747C15.646 8.55375 16.25 9.35988 16.25 10.2955V14.9318C16.25 16.2121 15.1189 17.25 13.7237 17.25H2.77632C1.38107 17.25 0.25 16.2121 0.25 14.9318V10.2955C0.25 9.35988 0.853987 8.55375 1.72368 8.18747ZM15.4079 10.2955C15.4079 9.44192 14.6538 8.75 13.7237 8.75H2.77632C1.84615 8.75 1.09211 9.44192 1.09211 10.2955V14.9318C1.09211 15.7853 1.84615 16.4773 2.77632 16.4773H13.7237C14.6538 16.4773 15.4079 15.7853 15.4079 14.9318V10.2955ZM8.67105 13.3864V11.8409C8.67105 11.6275 8.48254 11.4545 8.25 11.4545C8.01745 11.4545 7.82894 11.6275 7.82894 11.8409V13.3864C7.82894 13.5997 8.01745 13.7727 8.25 13.7727C8.48254 13.7727 8.67105 13.5997 8.67105 13.3864ZM9.51316 11.8409C9.51316 11.2008 8.94762 10.6818 8.25 10.6818C7.55237 10.6818 6.98684 11.2008 6.98684 11.8409V13.3864C6.98684 14.0265 7.55237 14.5455 8.25 14.5455C8.94762 14.5455 9.51316 14.0265 9.51316 13.3864V11.8409Z"
                          fill="#007AFF"
                          stroke="#007AFF"
                          strokeWidth={0.5}
                        />
                      </Svg>}
                    <Text style={styles.privacyText}>{item.privacy}</Text>
                    {item.collaborators && item.collaborators.length > 0 ? (
                      <View style={styles.avatarsRow}>
                        {item.collaborators.slice(0, 4).map((avatar, idx) => (
                          <Image
                            key={`${item.id}-${idx}`}
                            source={avatar}
                            style={[styles.avatarTiny, idx > 0 && { marginLeft: -8 }]}
                          />
                        ))}
                      </View>
                    ) : (
                      null
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No GPX files yet</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
  content: {
    paddingBottom: 120,
  },
  topActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 17,
    columnGap: 12,
  },
  iconButton: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    flex: 1,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  centerButtonContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    columnGap: 8,
  },
  centerButtonText: {
    color: '#8C8C8C',
    fontSize: 16,
    fontWeight: '600',
  },
  centerButtonInput: {
    flex: 1,
    color: '#1F1F1F',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
  },
  switchRow: {
    marginTop: 14,
    marginHorizontal: 86,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    flexDirection: 'row',
    padding: 1,
  },
  switchButton: {
    flex: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchButtonActive: {
    backgroundColor: '#1F1F1F',
  },
  switchText: {
    color: '#5C5D5E',
    fontSize: 16,
    fontWeight: '700',
  },
  switchTextActive: {
    color: '#F2F2F2',
  },
  menuBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 8,
  },
  popupMenu: {
    position: 'absolute',
    top: 84,
    left: 17,
    width: 224,
    height: 148,
    borderRadius: 30,
    backgroundColor: '#282828',
    paddingHorizontal: 18,
    paddingVertical: 14,
    justifyContent: 'space-between',
    zIndex: 9,
  },
  cardPopupMenu: {
    position: 'absolute',
    width: 224,
    height: 148,
    borderRadius: 30,
    backgroundColor: '#282828',
    paddingHorizontal: 18,
    paddingVertical: 14,
    justifyContent: 'space-between',
    zIndex: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuText: {
    color: '#F2F2F2',
    fontSize: 16,
    lineHeight: 19,
  },
  menuIconSpacer: {
    width: 20,
    height: 20,
  },
  svgRowWrapper: {
    marginTop: 16,
    paddingHorizontal: 17,
    alignItems: 'center',
  },
  cardsList: {
    marginTop: 12,
    gap: 13,
    paddingHorizontal: 17,
  },
  card: {
    height: 126,
    borderRadius: 30,
    backgroundColor: '#CFD0D1',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cardLeftCollage: {
    top: 10,
    width: 176,
    height: 126,
    position: 'relative',
  },
  imageTopLeft: {
    position: 'absolute',
    left: 11,
    top: 0,
    width: 82,
    height: 56,
    borderTopLeftRadius: 20,
  },
  imageTopRight: {
    position: 'absolute',
    left: 93,
    top: 0,
    width: 82,
    height: 108,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageBottomLeft: {
    position: 'absolute',
    left: 11,
    top: 53,
    width: 82,
    height: 56,
    borderBottomLeftRadius: 20,
  },
  cardRightInfo: {
    flex: 1,
    paddingTop: 14,
    paddingHorizontal: 12,
    paddingBottom: 12,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#1F1F1F',
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    paddingRight: 8,
  },
  moreText: {
    color: '#000000',
    fontSize: 22,
    lineHeight: 22,
  },
  titleStarIcon: {
    marginRight: 6,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    columnGap: 8,
  },
  privacyText: {
    color: '#1F1F1F',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'right',
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarTiny: {
    width: 17,
    height: 17,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CFD0D1',
  },
  lockPill: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  lockText: {
    fontSize: 12,
  },
  emptyState: {
    marginTop: 90,
    alignItems: 'center',
  },
  emptyText: {
    color: '#5C5D5E',
    fontSize: 15,
    fontWeight: '500',
  },
});
