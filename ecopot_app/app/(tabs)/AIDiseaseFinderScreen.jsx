import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AIDiseaseFinderScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your plant disease assistant. Upload a photo or describe your plant's symptoms, and I'll help diagnose the issue.", isUser: false },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();

  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const newMessages = [...messages, { id: messages.length + 1, text: inputText, isUser: true }];
    setMessages(newMessages);
    setInputText('');
    
    // Simulate AI response (in a real app, this would call your AI service)
    setTimeout(() => {
      setMessages([...newMessages, { 
        id: newMessages.length + 1, 
        text: "Based on your description, this could be leaf spot disease. It's common in humid conditions. I recommend removing affected leaves and ensuring better air circulation around your plant.", 
        isUser: false 
      }]);
    }, 1000);
  };

  const handleUploadImage = () => {
    // In a real app, implement image picking functionality
    // For now, just simulate adding an image message
    const newMessages = [...messages, { 
      id: messages.length + 1, 
      text: "I've uploaded a photo of my plant leaves.", 
      isUser: true,
      hasImage: true 
    }];
    setMessages(newMessages);
    
    // Simulate AI response to image
    setTimeout(() => {
      setMessages([...newMessages, { 
        id: newMessages.length + 1, 
        text: "I've analyzed your photo. It appears to be powdery mildew, a fungal disease. Try spraying with a mixture of water and baking soda, and keep the leaves dry when watering.", 
        isUser: false 
      }]);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#8E24AA', '#5E35B1']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Disease Finder</Text>
        <View style={styles.headerRight} />
      </LinearGradient>

      {/* Chat Messages */}
      <ScrollView 
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {messages.map(message => (
          <View 
            key={message.id} 
            style={[
              styles.messageBubble, 
              message.isUser ? styles.userMessage : styles.aiMessage
            ]}
          >
            {!message.isUser && (
              <View style={styles.aiAvatar}>
                <Ionicons name="leaf" size={16} color="white" />
              </View>
            )}
            <View style={styles.messageContent}>
              {message.hasImage && (
                <Image 
                  source={require('./plant11.jpg')} 
                  style={styles.messageImage} 
                />
              )}
              <Text style={[
                styles.messageText,
                message.isUser ? styles.userMessageText : styles.aiMessageText
              ]}>
                {message.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={handleUploadImage}
        >
          <Ionicons name="camera" size={24} color="#8E24AA" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Describe your plant's symptoms..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 30,
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 15,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  aiAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8E24AA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageContent: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  userMessageText: {
    color: '#333',
  },
  aiMessageText: {
    color: '#333',
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  uploadButton: {
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#8E24AA',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default AIDiseaseFinderScreen;
