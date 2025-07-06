import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, ColorValue } from 'react-native';
import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, TriangleAlert as AlertTriangle, Calendar, IndianRupee, Plus, ArrowRight } from 'lucide-react-native';
import { Header } from './Header';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING } from '../constants';
import { formatCurrency } from '../utils';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
  gradient: readonly [ColorValue, ColorValue, ...ColorValue[]];
}

function StatsCard({ title, value, change, isPositive, icon, color, gradient }: StatsCardProps) {
  return (
    <TouchableOpacity style={styles.statsCard}>
      <LinearGradient colors={gradient} style={styles.statsGradient}>
        <View style={styles.statsHeader}>
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            {icon}
          </View>
          <View style={styles.changeContainer}>
            {isPositive ? (
              <TrendingUp size={14} color="rgba(255,255,255,0.9)" />
            ) : (
              <TrendingDown size={14} color="rgba(255,255,255,0.9)" />
            )}
            <Text style={styles.changeText}>{change}</Text>
          </View>
        </View>
        <Text style={styles.statsValue}>{value}</Text>
        <Text style={styles.statsTitle}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function Dashboard() {
  const stats = [
    {
      title: 'Total Revenue',
      value: formatCurrency(245670),
      change: '+12.5%',
      isPositive: true,
      icon: <IndianRupee size={24} color="white" />,
      color: COLORS.primary,
      gradient: [COLORS.primary, '#1E40AF'] as [ColorValue, ColorValue]
    },
    {
      title: 'Total Products',
      value: '1,247',
      change: '+5.2%',
      isPositive: true,
      icon: <Package size={24} color="white" />,
      color: COLORS.success,
      gradient: [COLORS.success, '#059669'] as [ColorValue, ColorValue]
    },
    {
      title: 'Total Orders',
      value: '856',
      change: '+8.1%',
      isPositive: true,
      icon: <ShoppingCart size={24} color="white" />,
      color: COLORS.warning,
      gradient: [COLORS.warning, '#D97706'] as [ColorValue, ColorValue]
    },
    {
      title: 'Low Stock Items',
      value: '23',
      change: '-3.2%',
      isPositive: false,
      icon: <AlertTriangle size={24} color="white" />,
      color: COLORS.danger,
      gradient: [COLORS.danger, '#DC2626'] as [ColorValue, ColorValue]
    }
  ];

  const recentActivities = [
    { id: 1, action: 'New purchase order created', time: '2 hours ago', type: 'purchase', icon: ShoppingCart },
    { id: 2, action: 'Stock updated for Product ABC', time: '4 hours ago', type: 'stock', icon: Package },
    { id: 3, action: 'Sale completed - Order #1234', time: '6 hours ago', type: 'sale', icon: TrendingUp },
    { id: 4, action: 'New supplier added', time: '1 day ago', type: 'supplier', icon: Users },
  ];

  const quickActions = [
    { title: 'Add Product', icon: Package, color: COLORS.primary },
    { title: 'New Purchase', icon: ShoppingCart, color: COLORS.success },
    { title: 'Add Supplier', icon: Users, color: COLORS.warning },
    { title: 'View Reports', icon: Calendar, color: '#8B5CF6' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Dashboard" subtitle="Overview of your inventory" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <LinearGradient colors={['#1E40AF', COLORS.primary]} style={styles.heroGradient}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Welcome back, Rahul!</Text>
              <Text style={styles.heroSubtitle}>Your business is growing 📈</Text>
              <TouchableOpacity style={styles.heroButton}>
                <Text style={styles.heroButtonText}>View Analytics</Text>
                <ArrowRight size={16} color="#1E40AF" />
              </TouchableOpacity>
            </View>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.heroImage}
            />
          </LinearGradient>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.quickActions}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickActionCard}>
                <LinearGradient 
                  colors={[action.color + '15', action.color + '25']} 
                  style={styles.quickActionGradient}
                >
                  <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                    <action.icon size={20} color="white" />
                  </View>
                  <Text style={styles.quickActionText}>{action.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activitiesContainer}>
            {recentActivities.map((activity) => (
              <TouchableOpacity key={activity.id} style={styles.activityItem}>
                <View style={styles.activityIconContainer}>
                  <activity.icon size={16} color={COLORS.primary} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <ArrowRight size={16} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Performance Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Insights</Text>
          <View style={styles.insightsContainer}>
            <View style={styles.insightCard}>
              <Text style={styles.insightValue}>94%</Text>
              <Text style={styles.insightLabel}>Order Fulfillment</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '94%' }]} />
              </View>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightValue}>{formatCurrency(45000)}</Text>
              <Text style={styles.insightLabel}>Avg. Monthly Revenue</Text>
              <Text style={styles.insightTrend}>+15% from last month</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
    marginLeft: Platform.select({
      web: 0,
      default: 0,
    }),
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
  },
  heroSection: {
    marginBottom: SPACING.xxxl,
  },
  heroGradient: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroContent: {
    padding: SPACING.xxxl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  heroButtonText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: '#1E40AF',
  },
  heroImage: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.3,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
    gap: 15,
  },
  statsCard: {
    flex: 1,
    minWidth: Platform.select({
      web: '22%',
      default: '45%',
    }),
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  statsGradient: {
    padding: SPACING.xl,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: 'rgba(255,255,255,0.9)',
  },
  statsValue: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginBottom: 4,
  },
  statsTitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: 'rgba(255,255,255,0.8)',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    color: COLORS.dark,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    minWidth: Platform.select({
      web: '22%',
      default: '45%',
    }),
    borderRadius: 12,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: '#374151',
    textAlign: 'center',
  },
  activitiesContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.dark,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
  },
  insightsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  insightCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  insightValue: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.dark,
    marginBottom: 8,
  },
  insightLabel: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.gray,
    marginBottom: 12,
  },
  insightTrend: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.success,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
});