import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { TrendingUp, Package, Users, Calendar } from 'lucide-react-native';
import { Header } from './Header';

export function Sales() {
  const salesData = [
    { id: 1, orderId: '#ORD-001', customer: 'John Doe', amount: 2450, status: 'Completed', date: '2025-01-07' },
    { id: 2, orderId: '#ORD-002', customer: 'Jane Smith', amount: 1800, status: 'Pending', date: '2025-01-07' },
    { id: 3, orderId: '#ORD-003', customer: 'Bob Johnson', amount: 3200, status: 'Completed', date: '2025-01-06' },
    { id: 4, orderId: '#ORD-004', customer: 'Alice Brown', amount: 950, status: 'Cancelled', date: '2025-01-06' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return '#10B981';
      case 'Pending': return '#F59E0B';
      case 'Cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Sales" subtitle="Manage your sales and orders" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderLeftColor: '#3B82F6' }]}>
            <TrendingUp size={24} color="#3B82F6" />
            <Text style={styles.statValue}>₹45,670</Text>
            <Text style={styles.statLabel}>Today's Sales</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: '#10B981' }]}>
            <Package size={24} color="#10B981" />
            <Text style={styles.statValue}>127</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          
          <View style={styles.ordersContainer}>
            {salesData.map((order) => (
              <TouchableOpacity key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderId}>{order.orderId}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '15' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                      {order.status}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.customerName}>{order.customer}</Text>
                <View style={styles.orderFooter}>
                  <Text style={styles.orderAmount}>₹{order.amount.toLocaleString()}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ New Sale</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  ordersContainer: {
    gap: 12,
  },
  orderCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  customerName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderAmount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  orderDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
});