import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { useState } from 'react';
import { Plus, Calendar, Trash2, ChevronDown, Save, X, Search, Scan } from 'lucide-react-native';
import { Header } from './Header';
import { DatePicker } from './DatePicker';
import { Dropdown } from './Dropdown';
import { LinearGradient } from 'expo-linear-gradient';

interface PurchaseItem {
  id: string;
  productName: string;
  mrp: string;
  quantity: string;
  costPrice: string;
  batchNo: string;
  expiryDate: Date | null;
}

export function Purchases() {
  const [supplierName, setSupplierName] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [paidAmount, setPaidAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<PurchaseItem[]>([
    {
      id: '1',
      productName: '',
      mrp: '',
      quantity: '',
      costPrice: '',
      batchNo: '',
      expiryDate: null,
    }
  ]);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentModes = ['Cash', 'Card', 'UPI', 'Bank Transfer', 'Cheque', 'Credit'];

  const addNewItem = () => {
    const newItem: PurchaseItem = {
      id: Date.now().toString(),
      productName: '',
      mrp: '',
      quantity: '',
      costPrice: '',
      batchNo: '',
      expiryDate: null,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof PurchaseItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
    // Clear field-specific errors when user starts typing
    if (errors[`${field}_${items.findIndex(item => item.id === id)}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${field}_${items.findIndex(item => item.id === id)}`];
      setErrors(newErrors);
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const costPrice = parseFloat(item.costPrice) || 0;
      return total + (quantity * costPrice);
    }, 0);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!supplierName.trim()) {
      newErrors.supplierName = 'Supplier name is required';
    }

    items.forEach((item, index) => {
      if (!item.productName.trim()) {
        newErrors[`productName_${index}`] = 'Product name is required';
      }
      if (!item.quantity.trim()) {
        newErrors[`quantity_${index}`] = 'Quantity is required';
      } else if (parseFloat(item.quantity) <= 0) {
        newErrors[`quantity_${index}`] = 'Quantity must be greater than 0';
      }
      if (!item.costPrice.trim()) {
        newErrors[`costPrice_${index}`] = 'Cost price is required';
      } else if (parseFloat(item.costPrice) <= 0) {
        newErrors[`costPrice_${index}`] = 'Cost price must be greater than 0';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        Alert.alert(
          'Purchase Recorded Successfully! ✅',
          `Total purchase of ₹${calculateTotal().toFixed(2)} has been recorded and added to inventory.`,
          [{ 
            text: 'OK', 
            onPress: () => {
              // Reset form
              setSupplierName('');
              setPurchaseDate(new Date());
              setPaymentMode('Cash');
              setPaidAmount('');
              setNotes('');
              setItems([{
                id: '1',
                productName: '',
                mrp: '',
                quantity: '',
                costPrice: '',
                batchNo: '',
                expiryDate: null,
              }]);
              setErrors({});
            }
          }]
        );
      }, 1500);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Purchase',
      'Are you sure you want to cancel this purchase? All data will be lost.',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => {
          setSupplierName('');
          setPurchaseDate(new Date());
          setPaymentMode('Cash');
          setPaidAmount('');
          setNotes('');
          setItems([{
            id: '1',
            productName: '',
            mrp: '',
            quantity: '',
            costPrice: '',
            batchNo: '',
            expiryDate: null,
          }]);
          setErrors({});
        }}
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Stock Purchase" subtitle="Record new inventory purchases" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <LinearGradient colors={['#1E40AF', '#3B82F6']} style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>New Purchase</Text>
            <Text style={styles.headerSubtitle}>Record new inventory purchases</Text>
          </View>
        </LinearGradient>

        {/* Supplier Information */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Supplier Information</Text>
          
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Supplier Name <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, errors.supplierName && styles.inputError]}
                  placeholder="Enter supplier name"
                  value={supplierName}
                  onChangeText={(text) => {
                    setSupplierName(text);
                    if (errors.supplierName) {
                      const newErrors = { ...errors };
                      delete newErrors.supplierName;
                      setErrors(newErrors);
                    }
                  }}
                />
                <Search size={20} color="#9CA3AF" style={styles.inputIcon} />
              </View>
              {errors.supplierName && (
                <Text style={styles.errorText}>{errors.supplierName}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Purchase Date</Text>
              <DatePicker
                date={purchaseDate}
                onDateChange={setPurchaseDate}
                style={styles.input}
              />
            </View>
          </View>
        </View>

        {/* Items Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Items</Text>
            <TouchableOpacity onPress={addNewItem} style={styles.addButton}>
              <Plus size={16} color="#3B82F6" />
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
          
          {items.map((item, index) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>Item {index + 1}</Text>
                {items.length > 1 && (
                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                    style={styles.removeButton}
                  >
                    <X size={16} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Product Name <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.input, errors[`productName_${index}`] && styles.inputError]}
                    placeholder="Type to search products"
                    value={item.productName}
                    onChangeText={(value) => updateItem(item.id, 'productName', value)}
                  />
                  <TouchableOpacity style={styles.scanButton}>
                    <Scan size={16} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                {errors[`productName_${index}`] && (
                  <Text style={styles.errorText}>{errors[`productName_${index}`]}</Text>
                )}
              </View>

              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>MRP (₹)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0.00"
                    value={item.mrp}
                    onChangeText={(value) => updateItem(item.id, 'mrp', value)}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Quantity <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={[styles.input, errors[`quantity_${index}`] && styles.inputError]}
                    placeholder="1"
                    value={item.quantity}
                    onChangeText={(value) => updateItem(item.id, 'quantity', value)}
                    keyboardType="numeric"
                  />
                  {errors[`quantity_${index}`] && (
                    <Text style={styles.errorText}>{errors[`quantity_${index}`]}</Text>
                  )}
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Cost Price (₹) <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={[styles.input, errors[`costPrice_${index}`] && styles.inputError]}
                    placeholder="0.00"
                    value={item.costPrice}
                    onChangeText={(value) => updateItem(item.id, 'costPrice', value)}
                    keyboardType="numeric"
                  />
                  {errors[`costPrice_${index}`] && (
                    <Text style={styles.errorText}>{errors[`costPrice_${index}`]}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Batch No.</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Batch number"
                    value={item.batchNo}
                    onChangeText={(value) => updateItem(item.id, 'batchNo', value)}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Expiry Date</Text>
                <DatePicker
                  date={item.expiryDate}
                  onDateChange={(date) => updateItem(item.id, 'expiryDate', date)}
                  style={styles.input}
                  placeholder="Select expiry date"
                />
              </View>

              {/* Item Total */}
              {item.quantity && item.costPrice && (
                <View style={styles.itemTotal}>
                  <Text style={styles.itemTotalLabel}>Item Total:</Text>
                  <Text style={styles.itemTotalValue}>
                    ₹{(parseFloat(item.quantity) * parseFloat(item.costPrice)).toFixed(2)}
                  </Text>
                </View>
              )}
            </View>
          ))}

          <TouchableOpacity style={styles.addItemButton} onPress={addNewItem}>
            <Plus size={20} color="#3B82F6" />
            <Text style={styles.addItemText}>Add Another Item</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>

          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Payment Mode</Text>
              <Dropdown
                options={paymentModes}
                selectedValue={paymentMode}
                onValueChange={setPaymentMode}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Paid Amount (₹)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                value={paidAmount}
                onChangeText={setPaidAmount}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Additional notes about this purchase..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Total Section */}
        <LinearGradient colors={['#F8FAFC', '#EBF8FF']} style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalAmount}>₹{calculateTotal().toFixed(2)}</Text>
          </View>
          {paidAmount && (
            <View style={styles.totalRow}>
              <Text style={styles.balanceLabel}>
                {parseFloat(paidAmount) >= calculateTotal() ? 'Excess:' : 'Balance Due:'}
              </Text>
              <Text style={[
                styles.balanceAmount,
                { color: parseFloat(paidAmount) >= calculateTotal() ? '#10B981' : '#EF4444' }
              ]}>
                ₹{Math.abs(calculateTotal() - parseFloat(paidAmount || '0')).toFixed(2)}
              </Text>
            </View>
          )}
        </LinearGradient>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <X size={16} color="#6B7280" />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]} 
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <LinearGradient 
              colors={isSubmitting ? ['#9CA3AF', '#6B7280'] : ['#3B82F6', '#1E40AF']} 
              style={styles.submitGradient}
            >
              <Save size={16} color="white" />
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Saving...' : 'Submit Purchase'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
  headerGradient: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  addButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  formSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  row: {
    flexDirection: Platform.select({
      web: 'row',
      default: 'column',
    }),
    gap: 16,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  inputIcon: {
    position: 'absolute',
    right: 14,
    top: 14,
  },
  scanButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#EF4444',
    marginTop: 4,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  itemCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
  },
  itemTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  itemTotalLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  itemTotalValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 20,
    gap: 8,
  },
  addItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  totalSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  totalAmount: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1E40AF',
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  balanceAmount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  submitButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
});