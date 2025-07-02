import React, { useState, useEffect, use } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Camera,
  Upload,
} from "lucide-react";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
const [collected, setCollected] = useState([]);
const [selectedCard, setSelectedCard] = useState(null);

const openModal = (card) => setSelectedCard(card);


  // Form states
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Initialize with demo user but check localStorage first
  const [users, setUsers] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    // Load saved users from localStorage
    const savedUsers = localStorage.getItem("pokemonUsers");
    let loadedUsers = [];

    if (savedUsers) {
      try {
        loadedUsers = JSON.parse(savedUsers);
        console.log("Loaded users from localStorage:", loadedUsers);
        setUsers(loadedUsers);
      } catch (error) {
        console.error("Error parsing saved users:", error);
        // If there's an error, initialize with demo user
        loadedUsers = [
          {
            id: 1,
            name: "Demo User",
            email: "demo@pokemon.com",
            password: "demo123",
            profilePicture: null,
          },
        ];
        setUsers(loadedUsers);
        localStorage.setItem("pokemonUsers", JSON.stringify(loadedUsers));
      }
    } else {
      // First time loading - create demo user
      loadedUsers = [
        {
          id: 1,
          name: "Demo User",
          email: "demo@pokemon.com",
          password: "demo123",
          profilePicture: null,
        },
      ];
      setUsers(loadedUsers);
      localStorage.setItem("pokemonUsers", JSON.stringify(loadedUsers));
    }

    // Check if user is logged in (only after users are loaded)
    const savedUser = localStorage.getItem("pokemonCurrentUser");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Verify the user still exists in the users array
        const userExists = loadedUsers.find(
          (u) => u.id === parsedUser.id && u.email === parsedUser.email
        );
        if (userExists) {
          setCurrentUser(parsedUser);
          setIsLoggedIn(true);
          console.log("Auto-logged in user:", parsedUser);
        } else {
          // User doesn't exist anymore, clear the session
          localStorage.removeItem("pokemonCurrentUser");
        }
      } catch (error) {
        console.error("Error parsing current user:", error);
        localStorage.removeItem("pokemonCurrentUser");
      }
    }
  }, []);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!loginData.email) newErrors.email = "Email is required";
    else if (!validateEmail(loginData.email))
      newErrors.email = "Invalid email format";
    if (!loginData.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const user = users.find(
        (u) => u.email === loginData.email && u.password === loginData.password
      );

      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setLoginData({ email: "", password: "" });

        // Save current user to localStorage
        localStorage.setItem("pokemonCurrentUser", JSON.stringify(user));
      } else {
        setErrors({ general: "Invalid email or password" });
      }
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!registerData.name) newErrors.name = "Name is required";
    if (!registerData.email) newErrors.email = "Email is required";
    else if (!validateEmail(registerData.email))
      newErrors.email = "Invalid email format";
    if (!registerData.password) newErrors.password = "Password is required";
    else if (registerData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (users.find((u) => u.email === registerData.email)) {
      newErrors.email = "Email already registered";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const maxId = users.reduce(
        (max, user) => (user.id > max ? user.id : max),
        0
      );
      const newUser = {
        id: maxId + 1,
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        profilePicture: null,
      };

      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setCurrentUser(newUser);
      setIsLoggedIn(true);
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Save users and current user to localStorage
      localStorage.setItem("pokemonUsers", JSON.stringify(updatedUsers));
      localStorage.setItem("pokemonCurrentUser", JSON.stringify(newUser));
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;

        // Update current user
        const updatedUser = { ...currentUser, profilePicture: imageData };
        setCurrentUser(updatedUser);

        // Update users array
        const updatedUsers = users.map((user) =>
          user.id === currentUser.id ? updatedUser : user
        );
        setUsers(updatedUsers);

        // Save to localStorage
        localStorage.setItem("pokemonCurrentUser", JSON.stringify(updatedUser));
        localStorage.setItem("pokemonUsers", JSON.stringify(updatedUsers));

        setShowProfilePictureModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    const updatedUser = { ...currentUser, profilePicture: null };
    setCurrentUser(updatedUser);

    const updatedUsers = users.map((user) =>
      user.id === currentUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);

    // Save to localStorage
    localStorage.setItem("pokemonCurrentUser", JSON.stringify(updatedUser));
    localStorage.setItem("pokemonUsers", JSON.stringify(updatedUsers));

    setShowProfilePictureModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setErrors({});

    // Remove current user from localStorage (keep users data)
    localStorage.removeItem("pokemonCurrentUser");
  };

 
  useEffect(() => {
    let test = localStorage.getItem("favorites");
    if (test) {
      setFavorites(JSON.parse(test)); // Parse de JSON string naar array
    }
  }, []); // Lege dependency array - draait alleen bij mount

  console.log("dit is de laatste", favorites); // Gebruik comma, niet +

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0f2fe 0%, #f3e5f5 100%)",
      padding: "16px",
      fontFamily: "Arial, sans-serif",
    },
    profileContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    header: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "24px",
      marginBottom: "24px",
    },
    headerContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    avatarContainer: {
      position: "relative",
      cursor: "pointer",
    },
    avatar: {
      width: "80px",
      height: "80px",
      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      overflow: "hidden",
      border: "3px solid #e5e7eb",
    },
    avatarImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    cameraOverlay: {
      position: "absolute",
      bottom: "0",
      right: "0",
      backgroundColor: "#3b82f6",
      borderRadius: "50%",
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      border: "2px solid white",
    },
    userName: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1f2937",
      margin: "0 0 4px 0",
    },
    userEmail: {
      color: "#6b7280",
      margin: 0,
    },
    logoutBtn: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      padding: "12px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "background-color 0.2s",
    },
    modal: {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "24px",
      maxWidth: "400px",
      width: "90%",
      boxShadow: "0 20px 25px rgba(0, 0, 0, 0.1)",
    },
    modalTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "16px",
      textAlign: "center",
      color: "#1f2937",
    },
    modalButtons: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    modalBtn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "12px 16px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "background-color 0.2s",
    },
    uploadBtn: {
      backgroundColor: "#3b82f6",
      color: "white",
    },
    removeBtn: {
      backgroundColor: "#ef4444",
      color: "white",
    },
    cancelBtn: {
      backgroundColor: "#6b7280",
      color: "white",
    },
    hiddenInput: {
      display: "none",
    },
    authContainer: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0f2fe 0%, #f3e5f5 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
    },
    authForm: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      padding: "32px",
      width: "100%",
      maxWidth: "400px",
    },
    toggleContainer: {
      display: "flex",
      marginBottom: "24px",
      backgroundColor: "#f3f4f6",
      borderRadius: "8px",
      padding: "4px",
    },
    toggleBtn: {
      flex: 1,
      padding: "12px 16px",
      border: "none",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
      borderRadius: "6px",
    },
    toggleBtnActive: {
      backgroundColor: "#3b82f6",
      color: "white",
    },
    toggleBtnInactive: {
      backgroundColor: "transparent",
      color: "#4b5563",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center",
      color: "#1f2937",
      marginBottom: "24px",
    },
    inputGroup: {
      marginBottom: "16px",
      position: "relative",
    },
    inputContainer: {
      position: "relative",
    },
    inputIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#9ca3af",
      width: "20px",
      height: "20px",
    },
    input: {
      width: "100%",
      paddingLeft: "40px",
      paddingRight: "48px",
      paddingTop: "12px",
      paddingBottom: "12px",
      border: "2px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.2s",
      boxSizing: "border-box",
    },
    inputFocus: {
      borderColor: "#3b82f6",
    },
    inputError: {
      borderColor: "#ef4444",
    },
    eyeBtn: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#9ca3af",
      padding: "4px",
    },
    errorMsg: {
      color: "#ef4444",
      fontSize: "12px",
      marginTop: "4px",
    },
    generalError: {
      backgroundColor: "#fef2f2",
      border: "1px solid #fecaca",
      color: "#dc2626",
      padding: "12px 16px",
      borderRadius: "8px",
      marginBottom: "16px",
      fontSize: "14px",
    },
    submitBtn: {
      width: "100%",
      backgroundColor: "#3b82f6",
      color: "white",
      fontWeight: "bold",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.2s",
    },
    demoText: {
      textAlign: "center",
      marginTop: "16px",
      color: "#6b7280",
      fontSize: "14px",
    },
    contentArea: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "24px",
      textAlign: "center",
    },
    contentTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "16px",
    },
    contentText: {
      color: "#6b7280",
      lineHeight: 1.6,
    },
  };

  if (isLoggedIn && currentUser) {
    return (
      <div style={styles.container}>
        <div style={styles.profileContainer}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerContent}>
              <div style={styles.userInfo}>
                <div
                  style={styles.avatarContainer}
                  onClick={() => setShowProfilePictureModal(true)}
                >
                  <div style={styles.avatar}>
                    {currentUser.profilePicture ? (
                      <img
                        src={currentUser.profilePicture}
                        alt="Profile"
                        style={styles.avatarImage}
                      />
                    ) : (
                      <User size={32} />
                    )}
                  </div>
                  <div style={styles.cameraOverlay}>
                    <Camera size={12} />
                  </div>
                </div>
                <div>
                  <h1 style={styles.userName}>Welcome, {currentUser.name}!</h1>
                  <p style={styles.userEmail}>{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={styles.logoutBtn}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#dc2626")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#ef4444")
                }
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div style={styles.contentArea}>
            <h2 style={styles.contentTitle}>Your Pokemon Collection</h2>
            <p style={styles.contentText}>
              Welcome to your profile! Click on your profile picture above to
              upload a custom image. Your profile picture will be saved and
              restored when you log in again.
            </p>
            
            <div className="card-grid">
  {[...new Map([...favorites, ...collected].map(card => [card.id, card])).values()].map(card => (
    <div
      key={card.id}
      className="card"
      onClick={() => openModal(card)}
      style={{ cursor: 'pointer' }}
    >
      <img src={card.images.small} alt={card.name} />
      <p>{card.name}</p>
      <small>{card.rarity}</small>
    </div>
  ))}
</div>

          </div>
        </div>

        {/* Profile Picture Modal */}
        {showProfilePictureModal && (
          <div
            style={styles.modal}
            onClick={() => setShowProfilePictureModal(false)}
          >
            <div
              style={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={styles.modalTitle}>Update Profile Picture</h3>
              <div style={styles.modalButtons}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  style={styles.hiddenInput}
                  id="profile-picture-input"
                />
                <button
                  onClick={() =>
                    document.getElementById("profile-picture-input").click()
                  }
                  style={{ ...styles.modalBtn, ...styles.uploadBtn }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#2563eb")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#3b82f6")
                  }
                >
                  <Upload size={16} />
                  Upload New Picture
                </button>
                {currentUser.profilePicture && (
                  <button
                    onClick={removeProfilePicture}
                    style={{ ...styles.modalBtn, ...styles.removeBtn }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#dc2626")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#ef4444")
                    }
                  >
                    Remove Picture
                  </button>
                )}
                <button
                  onClick={() => setShowProfilePictureModal(false)}
                  style={{ ...styles.modalBtn, ...styles.cancelBtn }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#4b5563")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#6b7280")
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={styles.authContainer}>
      <div style={styles.authForm}>
        {/* Toggle between Login and Register */}
        <div style={styles.toggleContainer}>
          <button
            onClick={() => {
              setShowLogin(true);
              setErrors({});
            }}
            style={{
              ...styles.toggleBtn,
              ...(showLogin
                ? styles.toggleBtnActive
                : styles.toggleBtnInactive),
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              setShowLogin(false);
              setErrors({});
            }}
            style={{
              ...styles.toggleBtn,
              ...(!showLogin
                ? styles.toggleBtnActive
                : styles.toggleBtnInactive),
            }}
          >
            Register
          </button>
        </div>

        {errors.general && (
          <div style={styles.generalError}>{errors.general}</div>
        )}

        {showLogin ? (
          <div>
            <h2 style={styles.title}>Pokemon Card Trainer Login</h2>

            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <Mail style={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  style={{
                    ...styles.input,
                    ...(errors.email ? styles.inputError : {}),
                  }}
                />
              </div>
              {errors.email && <p style={styles.errorMsg}>{errors.email}</p>}
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <Lock style={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  style={{
                    ...styles.input,
                    ...(errors.password ? styles.inputError : {}),
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
              {errors.password && (
                <p style={styles.errorMsg}>{errors.password}</p>
              )}
            </div>

            <button
              onClick={handleLogin}
              style={styles.submitBtn}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
            >
              Login
            </button>

            <p style={styles.demoText}>Demo: demo@pokemon.com / demo123</p>
          </div>
        ) : (
          <div>
            <h2 style={styles.title}>Join the Pokemon Trainers</h2>

            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <User style={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                  style={{
                    ...styles.input,
                    ...(errors.name ? styles.inputError : {}),
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
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                  style={{
                    ...styles.input,
                    ...(errors.email ? styles.inputError : {}),
                  }}
                />
              </div>
              {errors.email && <p style={styles.errorMsg}>{errors.email}</p>}
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <Lock style={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                  style={{
                    ...styles.input,
                    ...(errors.password ? styles.inputError : {}),
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
              {errors.password && (
                <p style={styles.errorMsg}>{errors.password}</p>
              )}
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <Lock style={styles.inputIcon} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={registerData.confirmPassword}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      confirmPassword: e.target.value,
                    })
                  }
                  style={{
                    ...styles.input,
                    ...(errors.confirmPassword ? styles.inputError : {}),
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeBtn}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p style={styles.errorMsg}>{errors.confirmPassword}</p>
              )}
            </div>

            <button
              onClick={handleRegister}
              style={styles.submitBtn}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
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
