/**
 * Определяет, является ли устройство мобильным
 * @returns {boolean}
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 768;
};

/**
 * Генерирует ссылку на Telegram в зависимости от устройства
 * @param {string} username - Имя пользователя/канала/бота (без @)
 * @param {string} type - Тип: 'channel', 'user', 'bot' (по умолчанию 'channel')
 * @param {string} text - Текст сообщения (опционально)
 * @returns {string}
 */
export const getTelegramLink = (username, type = 'channel', text = '') => {
  const isMobileDevice = isMobile();
  
  if (isMobileDevice) {
    // Для мобильных устройств используем протокол tg://
    // Для текста сообщения используем параметр text
    if (text) {
      return `tg://resolve?domain=${username}&text=${encodeURIComponent(text)}`;
    }
    return `tg://resolve?domain=${username}`;
  } else {
    // Для десктопа используем веб-версию
    if (text) {
      return `https://t.me/${username}?text=${encodeURIComponent(text)}`;
    }
    return `https://t.me/${username}`;
  }
};

