(function () {
    const STYLES = `
        .chatbot-widget {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9999;
            font-family: 'Inter Tight', sans-serif;
        }

        .chatbot-toggle {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #0091ff;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            transition: transform 0.2s, background 0.2s;
        }

        .chatbot-toggle:hover {
            transform: scale(1.08);
            background: #007ae6;
        }

        .chatbot-toggle svg {
            width: 28px;
            height: 28px;
            fill: #fff;
            transition: transform 0.3s;
        }

        .chatbot-toggle.open .chatbot-icon-chat {
            display: none;
        }

        .chatbot-toggle.open .chatbot-icon-close {
            display: block;
        }

        .chatbot-toggle:not(.open) .chatbot-icon-close {
            display: none;
        }

        .chatbot-window {
            position: absolute;
            bottom: 72px;
            right: 0;
            width: 380px;
            height: 520px;
            background: #fff;
            border-radius: 16px;
            corner-shape:squircle;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            opacity: 0;
            transform: translateY(16px) scale(0.95);
            pointer-events: none;
            transition: opacity 0.25s, transform 0.25s;
        }

        .chatbot-window.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto;
        }

        .chatbot-header {
            background: #313131;
            color: #fff;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            flex-shrink: 0;
        }

        .chatbot-header-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            overflow: hidden;
            padding: 4px;
        }

        .chatbot-header-avatar img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .chatbot-header-info {
            display: flex;
            flex-direction: column;
        }

        .chatbot-header-name {
            font-weight: 600;
            font-size: 0.95rem;
            letter-spacing: 0.3px;
        }

        .chatbot-header-status {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.6);
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .chatbot-header-status::before {
            content: '';
            width: 7px;
            height: 7px;
            background: #22c55e;
            border-radius: 50%;
            display: inline-block;
        }

        .chatbot-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: #f9f9f9;
        }

        .chatbot-messages::-webkit-scrollbar {
            width: 4px;
        }

        .chatbot-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        .chatbot-messages::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
        }

        .chatbot-msg {
            max-width: 80%;
            padding: 10px 14px;
            border-radius: 16px;
            font-size: 0.875rem;
            line-height: 1.5;
            word-wrap: break-word;
        }

        .chatbot-msg.bot {
            background: #fff;
            color: #1a1a1a;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .chatbot-msg.user {
            background: #0091ff;
            color: #fff;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }

        .chatbot-typing {
            align-self: flex-start;
            display: none;
            gap: 4px;
            padding: 12px 16px;
            background: #fff;
            border-radius: 16px;
            border-bottom-left-radius: 4px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .chatbot-typing.visible {
            display: flex;
        }

        .chatbot-typing span {
            width: 6px;
            height: 6px;
            background: #999;
            border-radius: 50%;
            animation: chatbot-bounce 1.4s infinite;
        }

        .chatbot-typing span:nth-child(2) {
            animation-delay: 0.2s;
        }

        .chatbot-typing span:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes chatbot-bounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-6px); }
        }

        .chatbot-input-area {
            padding: 12px 16px;
            border-top: 1px solid #eee;
            display: flex;
            align-items: center;
            gap: 8px;
            background: #fff;
            flex-shrink: 0;
        }

        .chatbot-input {
            flex: 1;
            border: 1px solid #e0e0e0;
            border-radius: 24px;
            padding: 10px 16px;
            font-size: 0.875rem;
            font-family: 'Inter Tight', sans-serif;
            outline: none;
            transition: border-color 0.2s;
            background: #f9f9f9;
        }

        .chatbot-input:focus {
            border-color: #0091ff;
            background: #fff;
        }

        .chatbot-input::placeholder {
            color: #999;
        }

        .chatbot-send {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: #0091ff;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s, transform 0.15s;
            flex-shrink: 0;
        }

        .chatbot-send:hover {
            background: #007ae6;
            transform: scale(1.05);
        }

        .chatbot-send:disabled {
            background: #ccc;
            cursor: default;
            transform: none;
        }

        .chatbot-send svg {
            width: 18px;
            height: 18px;
            fill: #fff;
        }

        @media (max-width: 480px) {
            .chatbot-window {
                width: calc(100vw - 32px);
                height: calc(100vh - 140px);
                right: -8px;
                bottom: 68px;
                border-radius: 12px;
            }
        }
    `;

    function init() {
        // Inject styles
        const styleEl = document.createElement('style');
        styleEl.textContent = STYLES;
        document.head.appendChild(styleEl);

        // Build DOM
        const widget = document.createElement('div');
        widget.className = 'chatbot-widget';
        widget.innerHTML = `
            <div class="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-header-avatar">
                        <img src="./images/logo_dark.png" alt="Desoto Bits and Bytes">
                    </div>
                    <div class="chatbot-header-info">
                        <span class="chatbot-header-name">Desoto Bits & Bytes Assistant</span>
                        <span class="chatbot-header-status">Online</span>
                    </div>
                </div>
                <div class="chatbot-messages">
                    <div class="chatbot-msg bot">Hey there! 👋 How can I help you today?</div>
                    <div class="chatbot-typing">
                        <span></span><span></span><span></span>
                    </div>
                </div>
                <div class="chatbot-input-area">
                    <input type="text" class="chatbot-input" placeholder="Type a message..." maxlength="500" />
                    <button class="chatbot-send" aria-label="Send message">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l200 60-200 60v140Z"/></svg>
                    </button>
                </div>
            </div>
            <button class="chatbot-toggle" aria-label="Open chat">
                <svg class="chatbot-icon-chat" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Z"/></svg>
                <svg class="chatbot-icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </button>
        `;
        document.body.appendChild(widget);

        // References
        const toggle = widget.querySelector('.chatbot-toggle');
        const chatWindow = widget.querySelector('.chatbot-window');
        const input = widget.querySelector('.chatbot-input');
        const sendBtn = widget.querySelector('.chatbot-send');
        const messages = widget.querySelector('.chatbot-messages');
        const typing = widget.querySelector('.chatbot-typing');

        const API_BASE_URL = 'https://dbb-node-server.vercel.app';
        const TURNSTILE_SITE_KEY = '0x4AAAAAACCREQrrdh14nsL1';
        const conversationHistory = [];
        let isStreaming = false;
        let turnstileToken = null;
        let turnstileWidgetId = null;
        let turnstileVerified = false;

        // Invisible Turnstile — renders on init, passively obtains a token
        function initInvisibleTurnstile() {
            if (typeof turnstile === 'undefined') {
                setTimeout(initInvisibleTurnstile, 500);
                return;
            }
            const container = document.createElement('div');
            container.id = 'chatbot-turnstile';
            container.style.display = 'none';
            document.body.appendChild(container);
            turnstileWidgetId = turnstile.render('#chatbot-turnstile', {
                sitekey: TURNSTILE_SITE_KEY,
                size: 'invisible',
                callback: function(token) { turnstileToken = token; },
                'expired-callback': function() { turnstileToken = null; },
                'error-callback': function() { turnstileToken = null; }
            });
        }

        initInvisibleTurnstile();

        // Validate Turnstile once when chat window opens
        async function validateTurnstileOnce() {
            if (turnstileVerified) return true;

            if (!turnstileToken) {
                // Token not ready yet — execute and wait
                if (typeof turnstile !== 'undefined' && turnstileWidgetId !== null) {
                    turnstile.execute(turnstileWidgetId);
                }
                var attempts = 0;
                await new Promise(function(resolve) {
                    var check = setInterval(function() {
                        attempts++;
                        if (turnstileToken || attempts > 50) {
                            clearInterval(check);
                            resolve();
                        }
                    }, 100);
                });
            }

            if (!turnstileToken) return false;

            try {
                var res = await fetch(API_BASE_URL + '/validateTurnstile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: turnstileToken })
                });
                var data = await res.json();
                if (data.success) {
                    turnstileVerified = true;
                    return true;
                }
            } catch (e) {
                // validation request failed
            }
            return false;
        }

        // Toggle window
        toggle.addEventListener('click', async function () {
            const isOpen = chatWindow.classList.toggle('visible');
            toggle.classList.toggle('open', isOpen);
            if (isOpen) {
                // Validate turnstile silently when chat opens
                var valid = await validateTurnstileOnce();
                if (valid) {
                    input.disabled = false;
                    input.focus();
                } else {
                    appendMessage('Security check failed. Please refresh the page and try again.', 'bot');
                    input.disabled = true;
                    sendBtn.disabled = true;
                }
            }
        });

        // Send message
        async function sendMessage() {
            const text = input.value.trim();
            if (!text || isStreaming || !turnstileVerified) return;

            appendMessage(text, 'user');
            conversationHistory.push({ role: 'user', content: text });
            input.value = '';
            sendBtn.disabled = true;
            input.disabled = true;
            isStreaming = true;

            // Show typing indicator
            typing.classList.add('visible');
            scrollToBottom();

            try {
                const response = await fetch(API_BASE_URL + '/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: conversationHistory })
                });

                if (response.status === 429) {
                    typing.classList.remove('visible');
                    appendMessage('You\'re sending messages too quickly. Please wait a moment and try again.', 'bot');
                    finishStreaming();
                    return;
                }

                if (!response.ok) {
                    typing.classList.remove('visible');
                    appendMessage('Something went wrong. Please try again or call us at (662) 932-1047.', 'bot');
                    finishStreaming();
                    return;
                }

                // Create bot message bubble for streaming
                const botMsg = document.createElement('div');
                botMsg.className = 'chatbot-msg bot';
                messages.insertBefore(botMsg, typing);
                typing.classList.remove('visible');

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let fullText = '';
                let buffer = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    var lines = buffer.split('\n');
                    // Keep the last potentially incomplete line in the buffer
                    buffer = lines.pop() || '';

                    for (var i = 0; i < lines.length; i++) {
                        var line = lines[i].trim();
                        if (!line.startsWith('data: ')) continue;
                        var payload = line.slice(6);
                        if (payload === '[DONE]') continue;

                        try {
                            var parsed = JSON.parse(payload);
                            if (parsed.content) {
                                fullText += parsed.content;
                                botMsg.textContent = fullText;
                                scrollToBottom();
                            }
                        } catch (e) {
                            // skip malformed chunks
                        }
                    }
                }

                // If nothing streamed, show fallback
                if (!fullText) {
                    botMsg.textContent = 'Sorry, I didn\'t get a response. Please try again.';
                }

                conversationHistory.push({ role: 'assistant', content: fullText });
            } catch (err) {
                typing.classList.remove('visible');
                appendMessage('Connection error. Please check your internet and try again.', 'bot');
            }

            finishStreaming();
        }

        function finishStreaming() {
            isStreaming = false;
            input.disabled = false;
            sendBtn.disabled = !input.value.trim();
            input.focus();
        }

        function appendMessage(text, sender) {
            const msg = document.createElement('div');
            msg.className = 'chatbot-msg ' + sender;
            msg.textContent = text;
            messages.insertBefore(msg, typing);
            scrollToBottom();
        }

        function scrollToBottom() {
            messages.scrollTop = messages.scrollHeight;
        }

        sendBtn.addEventListener('click', sendMessage);

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Enable/disable send button based on input
        input.addEventListener('input', function () {
            if (!isStreaming && turnstileVerified) sendBtn.disabled = !input.value.trim();
        });

        sendBtn.disabled = true;
        input.disabled = true;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
