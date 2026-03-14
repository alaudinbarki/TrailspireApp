import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { BackArrowIcon } from '../src/components/icons/BackArrowIcon';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type RatioId = '9:16' | '16:9' | '3:4' | '4:3' | '1:1';

const ASPECT_RATIOS: Array<{ id: RatioId; label: string }> = [
  { id: '9:16', label: '9:16' },
  { id: '16:9', label: '16:9' },
  { id: '3:4', label: '3:4' },
  { id: '4:3', label: '4:3' },
  { id: '1:1', label: '1:1' },
];

const RATIO_SVG_META: Record<RatioId, { width: number; height: number; pathD: string }> = {
  '9:16': {
    width: 34,
    height: 51,
    pathD: 'M0.5 5.5C0.5 2.73858 2.73858 0.5 5.5 0.5H28.5C31.2614 0.5 33.5 2.73858 33.5 5.5V45C33.5 47.7614 31.2614 50 28.5 50H5.5C2.73858 50 0.5 47.7614 0.5 45V5.5Z',
  },
  '16:9': {
    width: 51,
    height: 34,
    pathD: 'M45 0.5C47.7614 0.5 50 2.73858 50 5.5L50 28.5C50 31.2614 47.7614 33.5 45 33.5L5.5 33.5C2.73857 33.5 0.499999 31.2614 0.499999 28.5L0.5 5.5C0.5 2.73857 2.73857 0.499998 5.5 0.499998L45 0.5Z',
  },
  '3:4': {
    width: 34,
    height: 43,
    pathD: 'M33.5 36.75C33.5 39.5114 31.2614 41.75 28.5 41.75H5.5C2.73858 41.75 0.5 39.5114 0.5 36.75V5.5C0.5 2.73858 2.73858 0.5 5.5 0.5H28.5C31.2614 0.5 33.5 2.73858 33.5 5.5V36.75Z',
  },
  '4:3': {
    width: 42,
    height: 34,
    pathD: 'M5.49967 33.5C2.73825 33.5 0.499674 31.2614 0.499675 28.5L0.499676 5.5C0.499676 2.73857 2.73825 0.499998 5.49968 0.499998L35.833 0.5C38.5944 0.5 40.833 2.73858 40.833 5.5L40.833 28.5C40.833 31.2614 38.5944 33.5 35.833 33.5L5.49967 33.5Z',
  },
  '1:1': {
    width: 34,
    height: 34,
    pathD: 'M33.5 28.5C33.5 31.2614 31.2614 33.5 28.5 33.5H5.5C2.73858 33.5 0.5 31.2614 0.5 28.5V5.5C0.5 2.73858 2.73858 0.5 5.5 0.5H28.5C31.2614 0.5 33.5 2.73858 33.5 5.5V28.5Z',
  },
};

const PREVIEW_MAX_WIDTH = SCREEN_WIDTH;
const CONTROL_ROW_BOTTOM = 16;
const CONTROL_ROW_HEIGHT = 54;
const CONTROL_RESERVED_SPACE = CONTROL_ROW_BOTTOM + CONTROL_ROW_HEIGHT;

const getRatioParts = (ratioId: RatioId) => {
  const [w, h] = ratioId.split(':').map(Number);
  return { w, h };
};

const fitRatioIntoBounds = (ratioId: RatioId, maxWidth: number, maxHeight: number) => {
  const { w, h } = getRatioParts(ratioId);

  if (ratioId === '9:16') {
    return {
      width: maxWidth,
      height: maxHeight,
    };
  }

  const ratio = w / h;
  const boundRatio = maxWidth / maxHeight;

  if (ratio > boundRatio) {
    return {
      width: maxWidth,
      height: maxWidth / ratio,
    };
  }

  return {
    width: maxHeight * ratio,
    height: maxHeight,
  };
};

function AspectRatioSvg({ ratioId, selected }: { ratioId: RatioId; selected: boolean }) {
  const meta = RATIO_SVG_META[ratioId];

  return (
    <Svg width={meta.width} height={meta.height} viewBox={`0 0 ${meta.width} ${meta.height}`} fill="none">
      <Path
        d={meta.pathD}
        fill={selected ? '#007AFF' : '#363636'}
        fillOpacity={selected ? 0.5 : 1}
        stroke={selected ? '#007AFF' : '#A0A0A0'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function SelectedTickIcon() {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1ZM0.5 6C0.5 2.96243 2.96243 0.5 6 0.5C9.03757 0.5 11.5 2.96243 11.5 6C11.5 9.03757 9.03757 11.5 6 11.5C2.96243 11.5 0.5 9.03757 0.5 6ZM5.76623 7.67671C5.77011 7.67329 5.77391 7.66972 5.77762 7.66601L8.76072 4.6829C8.85835 4.58527 8.85835 4.42698 8.76072 4.32935C8.66309 4.23171 8.5048 4.23171 8.40717 4.32935L5.57874 7.15777L3.6342 5.21323C3.53657 5.1156 3.37828 5.1156 3.28065 5.21323C3.18301 5.31086 3.18301 5.46915 3.28065 5.56678L5.40197 7.6881C5.4996 7.78573 5.65789 7.78573 5.75552 7.6881C5.75923 7.68439 5.7628 7.68059 5.76623 7.67671Z"
        fill="#007AFF"
        stroke="#0088FF"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function PhotoCropPortraitScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedRatio, setSelectedRatio] = useState<RatioId>('9:16');
  const [photoStageHeight, setPhotoStageHeight] = useState(520);

  const handlePhotoStageLayout = (event: LayoutChangeEvent) => {
    setPhotoStageHeight(event.nativeEvent.layout.height);
  };

  const previewVisibleHeight = Math.max(120, photoStageHeight - CONTROL_RESERVED_SPACE);
  const previewSize = fitRatioIntoBounds(selectedRatio, PREVIEW_MAX_WIDTH, previewVisibleHeight);
  const thumbSize = fitRatioIntoBounds(selectedRatio, 36, 54);

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
        }}
      />
      <View style={[styles.safeArea, { paddingBottom: insets.bottom }]}>
        {/* Photo Preview */}
        <View style={[styles.photoContainer, { marginTop: -insets.top }]}>
          <View style={styles.photoStage} onLayout={handlePhotoStageLayout}>
            <View style={[styles.photoFrame, { width: previewSize.width, height: previewSize.height }]}>
              <Image
                source={require('../assets/images/feed/mountains_hero.png')}
                style={styles.photoPreview}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Top Bar */}
          <View style={[styles.topBar, { top: insets.top }]}>
            <TouchableOpacity
              style={styles.backBtn}
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <BackArrowIcon width={20} height={20} color="#282828" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextBtn}
              activeOpacity={0.7}
              onPress={() => router.push('/create-activity')}
            >
              <Text style={styles.nextBtnText}>Next</Text>
              <Text style={styles.nextIcon}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.controlRow}>
            <TouchableOpacity style={styles.addBtn} activeOpacity={0.7} onPress={() => router.push('/photo-gallery')}>
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
            <Image
              source={require('../assets/images/feed/mountains_hero.png')}
              style={[styles.thumbnail, { width: thumbSize.width, height: thumbSize.height }]}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Thumbnail & Add Button */}
        {/* <View style={{
          backgroundColor: '#A0A0A0',
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 12,
          marginLeft: -5,
          marginRight: -5,
          paddingBottom: 20,
          paddingLeft: 18,
        }}> */}


        {/* </View> */}
        {/* Aspect Ratio Selector */}
        <View style={styles.aspectRatioRow}>
          {ASPECT_RATIOS.map((ratio) => (
            <TouchableOpacity
              key={ratio.id}
              style={styles.aspectBtn}
              activeOpacity={0.7}
              onPress={() => setSelectedRatio(ratio.id)}
            >
              <View
                style={[
                  styles.aspectIcon,
                  selectedRatio === ratio.id && styles.aspectIconActive,
                ]}
              >
                <AspectRatioSvg ratioId={ratio.id} selected={selectedRatio === ratio.id} />
                {selectedRatio === ratio.id && (
                  <View style={styles.selectedTickWrap}>
                    <SelectedTickIcon />
                  </View>
                )}
              </View>
              <Text
                style={[
                  styles.aspectText,
                  selectedRatio === ratio.id && styles.aspectTextActive,
                ]}
              >
                {ratio.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#282828',


  },
  safeArea: {
    flex: 1,

  },
  topBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginTop: 80,

  },
  backBtn: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    gap: 4,
  },
  nextBtnText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
  },
  nextIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  photoContainer: {
    marginTop: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#A0A0A0',
    alignSelf: 'center',
    width: PREVIEW_MAX_WIDTH,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 0,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  photoStage: {
    marginTop: 100,
    width: '100%',
    flex: 1,
    paddingBottom: CONTROL_RESERVED_SPACE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,

  },
  photoFrame: {
    overflow: 'hidden',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 30
    // marginTop:- 10
    // position: 'absolute',
  },
  controlRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: CONTROL_ROW_BOTTOM,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 18,
    gap: 10,
  },
  addBtn: {
    width: 36,
    height: 54,
    borderRadius: 5,
    borderColor: "#282828",
    borderWidth: 1,
    // backgroundColor: '#CFD0D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    fontSize: 28,
    color: '#282828',
    fontWeight: '300',
  },
  thumbnail: {
    width: 36,
    height: 54,
    borderRadius: 5,
  },
  aspectRatioRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    gap: 20,
    paddingBottom: 20,
  },
  aspectBtn: {
    alignItems: 'center',
    gap: 6,
  },
  aspectIcon: {
    minWidth: 34,
    minHeight: 34,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  aspectIconActive: {
    opacity: 1,
  },
  selectedTickWrap: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -6 }, { translateY: -6 }],
  },
  aspectText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14,
    color: '#A0A0A0',
  },
  aspectTextActive: {
    color: '#007AFF',
  },
});
