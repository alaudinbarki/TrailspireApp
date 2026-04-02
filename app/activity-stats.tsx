import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackArrowIcon } from '../src/components/icons/BackArrowIcon';

const BASE_WIDTH = 393;

const PERIOD_TABS = ['Week', 'Month', 'Year', 'All Time'];

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const CURRENT_DATA = [30, 45, 55, 40, 60, 70, 50, 65, 55, 45, 35, 25];
const PREV_DATA = [20, 30, 35, 25, 40, 45, 35, 50, 40, 30, 20, 15];

const STATS = [
  { label: 'Distance', value: '654.52', unit: 'km' },
  { label: 'Time', value: '321.31', unit: 'hrs' },
  { label: 'Calories', value: '3500', unit: 'kcal' },
  { label: 'Avg Heart Rate', value: '145', unit: 'bpm' },
];

const ACTIVITIES = [
  { id: 1, date: '16', month: 'MAR', type: 'Gravel cycling', location: 'Oslo, Norway', distance: '87 km' },
  { id: 2, date: '12', month: 'MAR', type: 'Trail Running', location: 'Oslo, Norway', distance: '12 km' },
  { id: 3, date: '08', month: 'MAR', type: 'Backcountry Skiing', location: 'Oslo, Norway', distance: '33 km' },
  { id: 4, date: '01', month: 'MAR', type: 'Gravel cycling', location: 'Oslo, Norway', distance: '42 km' },
];

export default function ActivityStatsScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState(2);
  const maxVal = Math.max(...CURRENT_DATA);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={() => router.back()}>
          <BackArrowIcon width={20} height={20} color="#282828" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Activity Stats</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Period Tabs */}
        <View style={styles.periodTabs}>
          {PERIOD_TABS.map((tab, idx) => (
            <TouchableOpacity
              key={tab}
              style={[styles.periodTab, selectedPeriod === idx && styles.periodTabActive]}
              activeOpacity={0.7}
              onPress={() => setSelectedPeriod(idx)}
            >
              <Text style={[styles.periodTabText, selectedPeriod === idx && styles.periodTabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bar Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#007AFF' }]} /><Text style={styles.legendText}>2024 · 321 hrs</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#A0A0A0' }]} /><Text style={styles.legendText}>2023 · 187 hrs</Text></View>
          </View>
          <View style={styles.chart}>
            {MONTH_LABELS.map((m, idx) => (
              <View key={m} style={styles.chartCol}>
                <View style={styles.barGroup}>
                  <View style={[styles.bar, styles.barPrev, { height: (PREV_DATA[idx] / maxVal) * 100 }]} />
                  <View style={[styles.bar, styles.barCurrent, { height: (CURRENT_DATA[idx] / maxVal) * 100 }]} />
                </View>
                <Text style={styles.chartLabel}>{m}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}<Text style={styles.statUnit}> {stat.unit}</Text></Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Activities */}
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        {ACTIVITIES.map((activity) => (
          <TouchableOpacity key={activity.id} style={styles.activityCard} activeOpacity={0.7} onPress={() => router.push('/activity-detail')}>
            <Image source={require('../assets/images/feed/activity_map_thumb.png')} style={styles.activityThumb} />
            <View style={styles.activityDateBadge}>
              <Text style={styles.activityDateDay}>{activity.date}</Text>
              <Text style={styles.activityDateMonth}>{activity.month}</Text>
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityType}>{activity.type}</Text>
              <Text style={styles.activityLocation}>{activity.location}</Text>
            </View>
            <View style={styles.activityRight}>
              <Text style={styles.activityDistance}>{activity.distance}</Text>
              <TouchableOpacity style={styles.openBtn} activeOpacity={0.7} onPress={() => router.push('/activity-detail')}>
                <Text style={styles.openBtnText}>Open</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F2F2F2' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { width: 49, height: 49, borderRadius: 15, backgroundColor: '#CFD0D1', alignItems: 'center', justifyContent: 'center' },
  headerSpacer: { width: 49 },
  headerTitle: { fontFamily: 'Inter', fontSize: 20, fontWeight: '600', color: '#282828' },
  scrollContent: { padding: 16, paddingBottom: 30 },
  periodTabs: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 4, marginBottom: 20 },
  periodTab: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  periodTabActive: { backgroundColor: '#007AFF' },
  periodTabText: { fontFamily: 'Inter', fontSize: 14, fontWeight: '500', color: '#A0A0A0' },
  periodTabTextActive: { color: '#FFFFFF', fontWeight: '600' },
  chartContainer: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 20 },
  chartLegend: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontFamily: 'Inter', fontSize: 12, color: '#666' },
  chart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120 },
  chartCol: { alignItems: 'center', flex: 1 },
  barGroup: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: 100, marginBottom: 8 },
  bar: { width: 6, borderRadius: 3, minHeight: 4 },
  barCurrent: { backgroundColor: '#007AFF' },
  barPrev: { backgroundColor: '#D9D9D9' },
  chartLabel: { fontFamily: 'Inter', fontSize: 9, color: '#A0A0A0' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  statCard: { width: (BASE_WIDTH - 44) / 2, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16 },
  statValue: { fontFamily: 'Inter', fontSize: 22, fontWeight: '700', color: '#282828' },
  statUnit: { fontSize: 14, fontWeight: '400', color: '#A0A0A0' },
  statLabel: { fontFamily: 'Inter', fontSize: 13, color: '#A0A0A0', marginTop: 4 },
  sectionTitle: { fontFamily: 'Inter', fontSize: 18, fontWeight: '600', color: '#282828', marginBottom: 12 },
  activityCard: { backgroundColor: '#FFFFFF', borderRadius: 16, marginBottom: 12, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12 },
  activityThumb: { width: 60, height: 60, borderRadius: 12 },
  activityDateBadge: { position: 'absolute', top: 14, left: 14, backgroundColor: '#007AFF', borderRadius: 6, paddingVertical: 2, paddingHorizontal: 6, alignItems: 'center' },
  activityDateDay: { fontFamily: 'Inter', fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  activityDateMonth: { fontFamily: 'Inter', fontSize: 8, fontWeight: '600', color: '#FFFFFF' },
  activityInfo: { flex: 1 },
  activityType: { fontFamily: 'Inter', fontSize: 15, fontWeight: '600', color: '#282828' },
  activityLocation: { fontFamily: 'Inter', fontSize: 12, color: '#A0A0A0', marginTop: 2 },
  activityRight: { alignItems: 'flex-end', gap: 8 },
  activityDistance: { fontFamily: 'Inter', fontSize: 14, fontWeight: '600', color: '#007AFF' },
  openBtn: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 8, backgroundColor: '#007AFF' },
  openBtnText: { fontFamily: 'Inter', fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
});
