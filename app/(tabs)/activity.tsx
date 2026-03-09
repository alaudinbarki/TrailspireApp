import React from 'react';
import SavedCollectionsScreen from '../saved-collections';

export default function ActivityScreen() {
    return <SavedCollectionsScreen />;
}


// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     ScrollView,
//     Image,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { BackArrowIcon } from '../../src/components/icons/BackArrowIcon';

// const COLLECTIONS = [
//     {
//         id: 1,
//         title: 'Skitouring Switzerland',
//         count: 235,
//         privacy: 'Shared library',
//         starred: true,
//         images: [
//             require('../../assets/images/feed/collection_preview_1.png'),
//             require('../../assets/images/feed/collection_preview_2.png'),
//             require('../../assets/images/feed/collection_preview_1.png'),
//         ],
//         collaborators: [
//             require('../../assets/images/feed/friend_avatar_andyros.png'),
//             require('../../assets/images/feed/friend_rowbat88.png'),
//         ],
//     },
//     {
//         id: 2,
//         title: 'Summer 2023',
//         count: 124,
//         privacy: 'Private',
//         starred: false,
//         images: [
//             require('../../assets/images/feed/collection_preview_2.png'),
//             require('../../assets/images/feed/collection_preview_1.png'),
//             require('../../assets/images/feed/collection_preview_2.png'),
//         ],
//         collaborators: [],
//     },
//     {
//         id: 3,
//         title: 'Mountain Peaks',
//         count: 89,
//         privacy: 'Shared library',
//         starred: true,
//         images: [
//             require('../../assets/images/feed/collection_preview_1.png'),
//             require('../../assets/images/feed/collection_preview_2.png'),
//             require('../../assets/images/feed/collection_preview_1.png'),
//         ],
//         collaborators: [
//             require('../../assets/images/feed/friend_jhonny.png'),
//         ],
//     },
// ];

// export default function ActivityScreen() {
//     const router = useRouter();
//     const [activeTab, setActiveTab] = useState<'collections' | 'gpx'>('collections');

//     return (
//         <SafeAreaView style={styles.screen} edges={['top']}>
//             <View style={styles.header}>
//                 <TouchableOpacity
//                     style={styles.backBtn}
//                     activeOpacity={0.7}
//                     onPress={() => router.back()}
//                 >
//                     <BackArrowIcon width={20} height={20} color="#282828" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Saved</Text>
//                 <TouchableOpacity
//                     style={styles.newBtn}
//                     activeOpacity={0.7}
//                     onPress={() => router.push('/new-collection-modal')}
//                 >
//                     <Text style={styles.newBtnText}>+ New</Text>
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.tabs}>
//                 <TouchableOpacity
//                     style={[styles.tab, activeTab === 'collections' && styles.tabActive]}
//                     activeOpacity={0.7}
//                     onPress={() => setActiveTab('collections')}
//                 >
//                     <Text style={[styles.tabText, activeTab === 'collections' && styles.tabTextActive]}>
//                         Collections
//                     </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={[styles.tab, activeTab === 'gpx' && styles.tabActive]}
//                     activeOpacity={0.7}
//                     onPress={() => setActiveTab('gpx')}
//                 >
//                     <Text style={[styles.tabText, activeTab === 'gpx' && styles.tabTextActive]}>
//                         GPX
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             <ScrollView
//                 style={styles.content}
//                 contentContainerStyle={styles.contentInner}
//                 showsVerticalScrollIndicator={false}
//             >
//                 {activeTab === 'collections' && (
//                     <View style={styles.collectionsGrid}>
//                         {COLLECTIONS.map((collection) => (
//                             <TouchableOpacity
//                                 key={collection.id}
//                                 style={styles.collectionCard}
//                                 activeOpacity={0.7}
//                                 onPress={() => router.push('/collection-detail-feed')}
//                             >
//                                 <View style={styles.collage}>
//                                     <Image source={collection.images[0]} style={styles.collageMain} />
//                                     <View style={styles.collageSide}>
//                                         <Image source={collection.images[1]} style={styles.collageSub} />
//                                         <Image source={collection.images[2]} style={styles.collageSub} />
//                                     </View>
//                                 </View>

//                                 <View style={styles.collectionInfo}>
//                                     <View style={styles.collectionHeader}>
//                                         <View style={styles.collectionTitleRow}>
//                                             <Text style={styles.collectionTitle}>{collection.title}</Text>
//                                             <TouchableOpacity activeOpacity={0.7} onPress={() => { }}>
//                                                 {collection.starred ? (
//                                                     <Text style={styles.starIconFilled}>★</Text>
//                                                 ) : (
//                                                     <Text style={styles.starIcon}>☆</Text>
//                                                 )}
//                                             </TouchableOpacity>
//                                         </View>
//                                         <TouchableOpacity
//                                             style={styles.moreBtn}
//                                             activeOpacity={0.7}
//                                             onPress={() => router.push('/edit-collection')}
//                                         >
//                                             <Text style={styles.moreBtnText}>⋯</Text>
//                                         </TouchableOpacity>
//                                     </View>

//                                     <Text style={styles.collectionCount}>{collection.count} activities</Text>

//                                     <View style={styles.collectionFooter}>
//                                         <View style={styles.privacyTag}>
//                                             <Text style={styles.privacyText}>{collection.privacy}</Text>
//                                         </View>

//                                         {collection.collaborators.length > 0 && (
//                                             <View style={styles.collaborators}>
//                                                 {collection.collaborators.map((avatar, idx) => (
//                                                     <Image
//                                                         key={idx}
//                                                         source={avatar}
//                                                         style={[
//                                                             styles.collaboratorAvatar,
//                                                             idx > 0 && { marginLeft: -8 },
//                                                         ]}
//                                                     />
//                                                 ))}
//                                             </View>
//                                         )}
//                                     </View>
//                                 </View>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 )}

//                 {activeTab === 'gpx' && (
//                     <View style={styles.emptyState}>
//                         <Text style={styles.emptyText}>No GPX files yet</Text>
//                     </View>
//                 )}
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     screen: {
//         flex: 1,
//         backgroundColor: '#D9D9D9',
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         backgroundColor: '#D9D9D9',
//     },
//     backBtn: {
//         width: 49,
//         height: 49,
//         borderRadius: 15,
//         backgroundColor: '#CFD0D1',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     headerTitle: {
//         fontFamily: 'Inter',
//         fontSize: 20,
//         fontWeight: '600',
//         color: '#282828',
//     },
//     newBtn: {
//         paddingHorizontal: 16,
//         paddingVertical: 10,
//         borderRadius: 12,
//         backgroundColor: '#007AFF',
//     },
//     newBtnText: {
//         fontFamily: 'Inter',
//         fontSize: 15,
//         fontWeight: '600',
//         color: '#FFFFFF',
//     },
//     tabs: {
//         flexDirection: 'row',
//         paddingHorizontal: 16,
//         paddingTop: 8,
//         paddingBottom: 12,
//         gap: 12,
//         backgroundColor: '#D9D9D9',
//     },
//     tab: {
//         paddingVertical: 8,
//         paddingHorizontal: 16,
//         borderRadius: 20,
//         backgroundColor: 'transparent',
//     },
//     tabActive: {
//         backgroundColor: '#282828',
//     },
//     tabText: {
//         fontFamily: 'Inter',
//         fontSize: 15,
//         fontWeight: '500',
//         color: '#A0A0A0',
//     },
//     tabTextActive: {
//         color: '#FFFFFF',
//         fontWeight: '600',
//     },
//     content: {
//         flex: 1,
//     },
//     contentInner: {
//         padding: 16,
//         paddingBottom: 120,
//     },
//     collectionsGrid: {
//         gap: 16,
//     },
//     collectionCard: {
//         backgroundColor: '#FCFCFC',
//         borderRadius: 15,
//         overflow: 'hidden',
//     },
//     collage: {
//         flexDirection: 'row',
//         height: 160,
//     },
//     collageMain: {
//         flex: 2,
//         height: '100%',
//     },
//     collageSide: {
//         flex: 1,
//         gap: 2,
//     },
//     collageSub: {
//         flex: 1,
//         width: '100%',
//     },
//     collectionInfo: {
//         padding: 12,
//     },
//     collectionHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         marginBottom: 4,
//     },
//     collectionTitleRow: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 8,
//     },
//     collectionTitle: {
//         fontFamily: 'Inter',
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#282828',
//         flex: 1,
//     },
//     starIcon: {
//         fontSize: 20,
//         color: '#A0A0A0',
//     },
//     starIconFilled: {
//         fontSize: 20,
//         color: '#FFD700',
//     },
//     moreBtn: {
//         paddingLeft: 8,
//     },
//     moreBtnText: {
//         fontSize: 24,
//         color: '#A0A0A0',
//     },
//     collectionCount: {
//         fontFamily: 'Inter',
//         fontSize: 13,
//         color: '#A0A0A0',
//         marginBottom: 12,
//     },
//     collectionFooter: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     privacyTag: {
//         paddingHorizontal: 10,
//         paddingVertical: 4,
//         borderRadius: 12,
//         backgroundColor: '#F0F0F0',
//     },
//     privacyText: {
//         fontFamily: 'Inter',
//         fontSize: 11,
//         fontWeight: '500',
//         color: '#666',
//     },
//     collaborators: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     collaboratorAvatar: {
//         width: 24,
//         height: 24,
//         borderRadius: 12,
//         borderWidth: 2,
//         borderColor: '#FFFFFF',
//     },
//     emptyState: {
//         paddingVertical: 60,
//         alignItems: 'center',
//     },
//     emptyText: {
//         fontFamily: 'Inter',
//         fontSize: 15,
//         color: '#A0A0A0',
//     },
// });
