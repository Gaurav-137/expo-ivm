import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LayoutDashboard, TrendingUp, ShoppingCart, Package, ChartBar as BarChart3, FileText, Calculator, User, Settings, LogOut, Menu, X } from 'lucide-react-native';
import { useState } from 'react';
import { ActiveTab } from '../types';
import { COLORS, FONTS } from '../constants';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

interface MenuItem {
  id: ActiveTab;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(Platform.OS !== 'web');

  const menuItems: MenuItem[] = [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard, color: COLORS.primary },
    { id: 'sales', title: 'Sales', icon: TrendingUp, color: COLORS.success },
    { id: 'purchases', title: 'Purchases', icon: ShoppingCart, color: COLORS.warning },
    { id: 'inventory', title: 'Inventory', icon: Package, color: '#8B5CF6' },
    { id: 'predictions', title: 'Predictions', icon: BarChart3, color: COLORS.danger },
    { id: 'reports', title: 'Reports', icon: FileText, color: COLORS.gray },
    { id: 'utilities', title: 'More', icon: Calculator, color: '#EC4899' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={[styles.container, isCollapsed && styles.collapsed]}>
      <LinearGradient colors={['#1E40AF', '#3B82F6']} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
            {isCollapsed ? (
              <Menu size={24} color="white" />
            ) : (
              <X size={24} color="white" />
            )}
          </TouchableOpacity>
          
          {!isCollapsed && (
            <View style={styles.headerContent}>
              <Text style={styles.logo}>InvenTrack</Text>
              <Text style={styles.subtitle}>Inventory Management</Text>
            </View>
          )}
        </View>

        {/* Navigation Menu */}
        <ScrollView style={styles.menu} showsVerticalScrollIndicator={false}>
          <View style={styles.menuSection}>
            {!isCollapsed && <Text style={styles.sectionTitle}>MAIN</Text>}
            
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    isActive && styles.activeMenuItem,
                    isCollapsed && styles.collapsedMenuItem,
                  ]}
                  onPress={() => onTabChange(item.id)}
                >
                  <View style={[styles.iconContainer, isActive && { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                    <Icon 
                      size={20} 
                      color={isActive ? 'white' : 'rgba(255,255,255,0.7)'} 
                    />
                  </View>
                  
                  {!isCollapsed && (
                    <Text style={[styles.menuText, isActive && styles.activeMenuText]}>
                      {item.title}
                    </Text>
                  )}
                  
                  {isActive && !isCollapsed && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* User Section */}
          {!isCollapsed && (
            <View style={styles.menuSection}>
              <Text style={styles.sectionTitle}>ACCOUNT</Text>
              
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.iconContainer}>
                  <User size={20} color="rgba(255,255,255,0.7)" />
                </View>
                <Text style={styles.menuText}>Profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.iconContainer}>
                  <Settings size={20} color="rgba(255,255,255,0.7)" />
                </View>
                <Text style={styles.menuText}>Settings</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.iconContainer}>
                  <LogOut size={20} color="rgba(255,255,255,0.7)" />
                </View>
                <Text style={styles.menuText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {/* User Profile */}
        <View style={[styles.userProfile, isCollapsed && styles.collapsedUserProfile]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>RS</Text>
          </View>
          
          {!isCollapsed && (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Rahul Sharma</Text>
              <Text style={styles.userRole}>Admin</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Platform.select({
      web: 280,
      default: '100%',
    }),
    height: Platform.select({
      web: '100%',
      default: 80,
    }),
    position: Platform.select({
      web: 'relative',
      default: 'absolute',
    }),
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  collapsed: {
    width: Platform.select({
      web: 80,
      default: 60,
    }),
  },
  gradient: {
    flex: 1,
    paddingTop: Platform.select({
      web: 0,
      default: 20,
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  headerContent: {
    marginLeft: 16,
    flex: 1,
  },
  logo: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: 'white',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: 'rgba(255,255,255,0.7)',
  },
  menu: {
    flex: 1,
    paddingTop: 20,
  },
  menuSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: FONTS.semiBold,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 12,
    marginLeft: 20,
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 12,
    borderRadius: 12,
    position: 'relative',
  },
  activeMenuItem: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  collapsedMenuItem: {
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 12,
    flex: 1,
  },
  activeMenuText: {
    color: 'white',
    fontFamily: FONTS.semiBold,
  },
  activeIndicator: {
    width: 4,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 2,
    position: 'absolute',
    right: 0,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  collapsedUserProfile: {
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: 'white',
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: 'white',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: 'rgba(255,255,255,0.7)',
  },
});