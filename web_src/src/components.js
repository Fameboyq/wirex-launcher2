// --- Notification Context & Provider ---
const NotificationContext = React.createContext(undefined);

const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = React.useState([]);

  const addNotification = (text, title) => {
    const id = Date.now();
    setNotifications((prev) => [
      ...prev,
      { title, id, text, onClose: () => removeNotification(id) }
    ]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return JSX.jsxs(NotificationContext.Provider, {
    value: { addNotification },
    children: [
      children,
      JSX.jsx("div", {
        className: "notification-container",
        children: notifications.map(({ title, id, text, onClose }) =>
          JSX.jsx(Notification, { title, text, onClose }, id)
        ),
      }),
    ],
  });
};

// --- Notification Toast Component ---
const Notification = ({ text = "", duration = 2000, onClose }) => {
  const [isClosing, setIsClosing] = React.useState(false);
  const [, setTruncatedText] = React.useState("...");

  React.useEffect(() => {
    if (!text) return;
    const isLong = text.length > 30;
    setTruncatedText(isLong ? text.substring(0, text.length - 10) : text);

    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        if (onClose) onClose();
      }, 900);
    }, duration);

    return () => clearTimeout(timer);
  }, [text, duration, onClose]);

  return JSX.jsx("div", {
    className: `notification ${isClosing ? "closing" : "show"}`,
    children: JSX.jsx("div", {
      className: "notification-block",
      children: JSX.jsx("div", {
        className: "notification-text",
        children: JSX.jsx("div", {
          className: "notification-message",
          children: text,
        }),
      }),
    }),
  });
};

// --- Custom Form Input Field ---
const InputField = ({
  name,
  value,
  type = "text",
  placeholder,
  minLength,
  maxLength,
  onBlur,
  onChange,
  onKeyDown,
  onClick,
  required,
  style,
  defaultValue,
  disabled,
  icon,
  remover = true,
}) => {
  const [hasValue, setHasValue] = React.useState(false);
  const inputRef = React.useRef(null);
  
  React.useEffect(() => {
    if (inputRef.current && type) {
      inputRef.current.type = type;
    }
  }, [type]);

  const handleClear = () => {
    setHasValue(false);
    if (onChange) {
      onChange({ target: { value: "" } });
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return JSX.jsx(React.Fragment, {
    children: JSX.jsxs("div", {
      className: AV.inputContainer,
      children: [
        JSX.jsx("input", {
          ref: inputRef,
          disabled: disabled,
          onKeyUp: onKeyDown,
          style: style,
          name: name,
          defaultValue: defaultValue,
          value: value,
          type: type,
          placeholder: placeholder,
          onBlur: onBlur,
          onClick: onClick,
          onInput: (e) => {
            setHasValue(!!e.currentTarget.value);
          },
          onChange: onChange,
          autoComplete: "off",
          required: required,
          minLength: minLength,
          maxLength: maxLength,
        }),
        icon &&
          JSX.jsx("div", {
            className: AV.inputIcon,
            style: { fontFamily: "Icons" },
            translate: "no",
            children: icon,
          }),
        hasValue &&
          remover &&
          JSX.jsx("div", {
            className: AV.inputXMark,
            onClick: handleClear,
            style: { fontFamily: "Icons" },
            translate: "no",
            children: "2",
          }),
      ],
    }),
  });
};

// --- Custom Action Button ---
const Button = ({
  id,
  buttonType,
  description,
  onClick,
  onDoubleClick,
  type,
  icon,
  iconStyle,
  style,
  disabled,
  navigate,
  loading,
}) => {
  let buttonElement;
  const buttonRef = React.useRef(null);
  const navigateTo = useTransitionNavigate();
  const [isLightMode, setIsLightMode] = React.useState(
    document.documentElement.classList.contains("light")
  );

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLightMode(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (navigate && buttonRef.current) {
      buttonRef.current.onclick = () => {
        navigateTo(navigate);
      };
    }
  }, [navigate, navigateTo]);

  const content = loading
    ? JSX.jsx("span", { className: Uo.loader })
    : JSX.jsxs(React.Fragment, {
        children: [
          JSX.jsx("span", {
            style: { ...iconStyle, color: buttonType === "fill" ? "black" : "white", fontFamily: "Icons" },
            translate: "no",
            children: icon,
          }),
          description,
        ],
      });

  if (buttonType === "outline") {
    buttonElement = JSX.jsx("button", {
      ref: buttonRef,
      style: { ...style, color: isLightMode ? "black" : "white" },
      className: Uo.outline,
      id: id,
      onDoubleClick: onDoubleClick,
      onClick: onClick,
      type: type,
      disabled: loading || disabled,
      children: content,
    });
  } else if (buttonType === "fill") {
    buttonElement = JSX.jsx("button", {
      ref: buttonRef,
      style: { ...style, color: isLightMode ? "white" : "black" },
      className: Uo.fill,
      id: id,
      onDoubleClick: onDoubleClick,
      onClick: onClick,
      type: type,
      disabled: loading || disabled,
      children: content,
    });
  }

  return JSX.jsx(React.Fragment, { children: buttonElement });
};

// --- Custom Range Slider ---
const RangeSlider = ({ min = 0, max = 100, step, value, onChange }) => {
  const getProgressPercent = () => {
    return ((value - min) / (max - min)) * 100;
  };

  return JSX.jsx("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: onChange,
    className: "custom-range",
    style: {
      background: `linear-gradient(to right, var(--accent-color-mixed) 0%, var(--accent-color-mixed) ${getProgressPercent()}%, #2b2b2ba6 ${getProgressPercent()}%, #2b2b2ba6 100%)`,
    },
  });
};

// --- Play Icon SVG Component ---
const PlayIcon = (props) => {
  return React.createElement(
    "svg",
    {
      width: 8,
      height: 8,
      viewBox: "0 0 8 8",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
    },
    React.createElement("path", {
      d: "M0 3.99004V2.32588C0 0.253161 1.46609 -0.593864 3.2613 0.442496L4.70745 1.27956L6.15359 2.11662C7.9488 3.15298 7.9488 4.84702 6.15359 5.88338L4.70745 6.72044L3.2613 7.5575C1.46609 8.59386 0 7.74684 0 5.67412V3.99004Z",
      fill: "white",
    })
  );
};
