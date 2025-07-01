import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Eye, EyeOff, LogOut } from 'lucide-react';

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  // In your actual project, replace this with localStorage
  const [users, setUsers] = useState([
    { id: 1, name: 'Demo User', email: 'demo@pokemon.com', password: 'demo123' }
  ]);

  // Check if user is logged in on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
    
    // Load existing users
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!loginData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(loginData.email)) newErrors.email = 'Invalid email format';
    if (!loginData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Check if user exists
      const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
      
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setLoginData({ email: '', password: '' });
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        setErrors({ general: 'Invalid email or password' });
      }
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!registerData.name) newErrors.name = 'Name is required';
    if (!registerData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(registerData.email)) newErrors.email = 'Invalid email format';
    if (!registerData.password) newErrors.password = 'Password is required';
    else if (registerData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Check if email already exists
    if (users.find(u => u.email === registerData.email)) {
      newErrors.email = 'Email already registered';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newUser = {
        id: users.length + 1,
        name: registerData.name,
        email: registerData.email,
        password: registerData.password
      };

      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setCurrentUser(newUser);
      setIsLoggedIn(true);
      setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
      
      // Save to localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setErrors({});
    
    // Remove from localStorage
    localStorage.removeItem('currentUser');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #f3e5f5 100%)',
      padding: '16px',
      fontFamily: 'Arial, sans-serif'
    },
    profileContainer: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '24px'
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    avatar: {
      width: '64px',
      height: '64px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    },
    userName: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0 0 4px 0'
    },
    userEmail: {
      color: '#6b7280',
      margin: 0
    },
    logoutBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      padding: '12px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    collectionContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px'
    },
    collectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '16px'
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '16px'
    },
    card: {
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      padding: '16px',
      borderRadius: '8px',
      border: '2px solid #f59e0b',
      transition: 'transform 0.2s'
    },
    cardName: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0 0 8px 0'
    },
    cardDetail: {
      color: '#4b5563',
      margin: '4px 0',
      fontSize: '14px'
    },
    authContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #f3e5f5 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    },
    authForm: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      width: '100%',
      maxWidth: '400px'
    },
    toggleContainer: {
      display: 'flex',
      marginBottom: '24px',
      backgroundColor: '#f3f4f6',
      borderRadius: '8px',
      padding: '4px'
    },
    toggleBtn: {
      flex: 1,
      padding: '12px 16px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      borderRadius: '6px'
    },
    toggleBtnActive: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    toggleBtnInactive: {
      backgroundColor: 'transparent',
      color: '#4b5563'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#1f2937',
      marginBottom: '24px'
    },
    inputGroup: {
      marginBottom: '16px',
      position: 'relative'
    },
    inputContainer: {
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      width: '20px',
      height: '20px'
    },
    input: {
      width: '100%',
      paddingLeft: '40px',
      paddingRight: '48px',
      paddingTop: '12px',
      paddingBottom: '12px',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#3b82f6'
    },
    inputError: {
      borderColor: '#ef4444'
    },
    eyeBtn: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#9ca3af',
      padding: '4px'
    },
    errorMsg: {
      color: '#ef4444',
      fontSize: '12px',
      marginTop: '4px'
    },
    generalError: {
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      color: '#dc2626',
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '16px',
      fontSize: '14px'
    },
    submitBtn: {
      width: '100%',
      backgroundColor: '#3b82f6',
      color: 'white',
      fontWeight: 'bold',
      padding: '12px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.2s'
    },
    demoText: {
      textAlign: 'center',
      marginTop: '16px',
      color: '#6b7280',
      fontSize: '14px'
    }
  };

  if (isLoggedIn && currentUser) {
    return (
      <div style={styles.container}>
        <div style={styles.profileContainer}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerContent}>
              <div style={styles.userInfo}>
                <div style={styles.avatar}>
                  <User size={32} />
                </div>
                <div>
                  <h1 style={styles.userName}>Welcome, {currentUser.name}!</h1>
                  <p style={styles.userEmail}>{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={styles.logoutBtn}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          
          
        </div>
      </div>
    );
  }

  return (
    <div style={styles.authContainer}>
      <div style={styles.authForm}>
        {/* Toggle between Login and Register */}
        <div style={styles.toggleContainer}>
          <button
            onClick={() => {setShowLogin(true); setErrors({});}}
            style={{
              ...styles.toggleBtn,
              ...(showLogin ? styles.toggleBtnActive : styles.toggleBtnInactive)
            }}
          >
            Login
          </button>
          <button
            onClick={() => {setShowLogin(false); setErrors({});}}
            style={{
              ...styles.toggleBtn,
              ...(!showLogin ? styles.toggleBtnActive : styles.toggleBtnInactive)
            }}
          >
            Register
          </button>
        </div>

        {errors.general && (
          <div style={styles.generalError}>
            {errors.general}
          </div>
        )}

        {showLogin ? (
          <div>
            <h2 style={styles.title}>
              Pokemon Card Trainer Login
            </h2>
            
            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <Mail style={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  style={{
                    ...styles.input,
                    ...(errors.email ? styles.inputError : {})
                  }}
                />
              </div>
              {errors.email && <p style={styles.errorMsg}>{errors.email}</p>}
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <Lock style={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  style={{
                    ...styles.input,
                    ...(errors.password ? styles.inputError : {})
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p style={styles.errorMsg}>{errors.password}</p>}
            </div>

            <button
              onClick={handleLogin}
              style={styles.submitBtn}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              Login
            </button>

            <p style={styles.demoText}>
              Demo: demo@pokemon.com / demo123
            </p>
          </div>
        ) : (
          <div>
            <h2 style={styles.title}>
              Join the Pokemon Trainers
            </h2>
            
            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <User style={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  style={{
                    ...styles.input,
                    ...(errors.name ? styles.inputError : {})
                  }}
                />
              </div>
              {errors.name && <p style={styles.errorMsg}>{errors.name}</p>}
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <Mail style={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  style={{
                    ...styles.input,
                    ...(errors.email ? styles.inputError : {})
                  }}
                />
              </div>
              {errors.email && <p style={styles.errorMsg}>{errors.email}</p>}
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <Lock style={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  style={{
                    ...styles.input,
                    ...(errors.password ? styles.inputError : {})
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p style={styles.errorMsg}>{errors.password}</p>}
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <Lock style={styles.inputIcon} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  style={{
                    ...styles.input,
                    ...(errors.confirmPassword ? styles.inputError : {})
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeBtn}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <p style={styles.errorMsg}>{errors.confirmPassword}</p>}
            </div>

            <button
              onClick={handleRegister}
              style={styles.submitBtn}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;