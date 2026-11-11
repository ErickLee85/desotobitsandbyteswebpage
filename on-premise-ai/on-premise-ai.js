gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

window.addEventListener('load', () => {
    const learnMore = document.querySelector('.op-learn-more');
    if (learnMore) {
        learnMore.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('op-why');
            if (!target) return;
            const smoother = ScrollSmoother.get();
            if (smoother) {
                try {
                    smoother.scrollTo(target, true, 'top top');
                    return;
                } catch (error) { /* fall through to native scroll */ }
            }
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});

// Terminal demo: types out a local model session, then loops.
(function terminalDemo() {
    const body = document.getElementById('opTerminalBody');
    if (!body) return;

    const script = [
        { cls: 't-prompt', text: 'admin@ai-server:~$ ', instant: true },
        { cls: 't-cmd', text: 'docker compose up -d\n' },
        { cls: 't-dim', text: '✔ Container ollama      Started\n✔ Container open-webui  Started\n\n', instant: true },
        { cls: 't-prompt', text: 'admin@ai-server:~$ ', instant: true },
        { cls: 't-cmd', text: 'ollama run granite3.3:8b\n' },
        { cls: 't-dim', text: '>>> ', instant: true },
        { cls: 't-cmd', text: 'Summarize the Q3 vendor contracts on the NAS\n\n' },
        { cls: 't-ai', text: 'Found 6 contracts in \\\\nas\\legal\\vendors\\Q3. Two renew automatically in 30 days, one has a price increase clause above 5%...\n\n' },
        { cls: 't-dim', text: '0 bytes sent to the cloud.', instant: true }
    ];

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cursor = document.createElement('span');
    cursor.className = 'op-terminal-cursor';

    const renderAll = () => {
        body.textContent = '';
        script.forEach(({ cls, text }) => {
            const span = document.createElement('span');
            span.className = cls;
            span.textContent = text;
            body.appendChild(span);
        });
        body.appendChild(cursor);
    };

    if (reduceMotion) {
        renderAll();
        return;
    }

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    async function play() {
        while (true) {
            body.textContent = '';
            body.appendChild(cursor);
            for (const { cls, text, instant } of script) {
                const span = document.createElement('span');
                span.className = cls;
                body.insertBefore(span, cursor);
                if (instant) {
                    span.textContent = text;
                    await sleep(350);
                    continue;
                }
                const speed = cls === 't-ai' ? 14 : 45;
                for (const ch of text) {
                    span.textContent += ch;
                    await sleep(speed);
                }
                await sleep(400);
            }
            await sleep(5000);
        }
    }

    play();
})();
