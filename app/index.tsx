import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Sidebar } from '@/src/components/Sidebar';
import { Dashboard } from '@/src/components/Dashboard';
import { Sales } from '@/src/components/Sales';
import { Purchases } from '@/src/components/Purchases';
import { Inventory } from '@/src/components/Inventory';
import { Predictions } from '@/src/components/Predictions';
import { Reports } from '@/src/components/Reports';
import { Utilities } from '@/src/components/Utilities';
import { ActiveTab } from '@/src/types';
import { COLORS } from '@/src/constants';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'sales':
        return <Sales />;
      case 'purchases':
        return <Purchases />;
      case 'inventory':
        return <Inventory />;
      case 'predictions':
        return <Predictions />;
      case 'reports':
        return <Reports />;
      case 'utilities':
        return <Utilities />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.layout}>
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <View style={styles.content}>
          {renderContent()}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  layout: {
    flex: 1,
    flexDirection: Platform.select({
      web: 'row',
      default: 'column',
    }),
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
});