import { useState } from 'react'
import { useSubscribeDev } from '@subscribe.dev/react'
import './App.css'

// Sign-in screen component
function SignInScreen({ signIn }: { signIn: () => void }) {
  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <h1>🐱 Cute Cat Generator</h1>
        <p className="tagline">Generate adorable themed cats with AI</p>
        <p className="description">
          Create unique cat images themed around your favorite things - chocolate cats,
          strawberry cats, space cats, and more!
        </p>
        <button onClick={signIn} className="sign-in-button">
          Sign In to Generate Cats
        </button>
      </div>
    </div>
  )
}

// Main app component (only renders when signed in)
function CatGeneratorApp() {
  const { client, usage, subscribe, subscriptionStatus, useStorage, signOut, user } = useSubscribeDev()

  // Storage for generation history and metadata
  const [history, setHistory, historySync] = useStorage<Array<{
    theme: string
    imageUrl: string
    timestamp: number
  }>>('cat-history', [])

  const [customTheme, setCustomTheme] = useState('')
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const predefinedThemes = [
    '🍫 Chocolate',
    '🍓 Strawberry',
    '🌸 Cherry Blossom',
    '🌊 Ocean',
    '🌌 Galaxy',
    '🔥 Fire',
    '❄️ Ice',
    '🌈 Rainbow',
    '🍋 Lemon',
    '🌙 Moonlight',
    '☁️ Cloud',
    '🍑 Peach'
  ]

  const generateCat = async (theme: string) => {
    if (!client || !theme.trim()) return

    setLoading(true)
    setError(null)
    setGeneratedImage(null)

    try {
      const cleanTheme = theme.replace(/[🍫🍓🌸🌊🌌🔥❄️🌈🍋🌙☁️🍑]/g, '').trim()
      const prompt = `A cute adorable fluffy cat themed around ${cleanTheme}. The cat should have design elements, colors, and patterns inspired by ${cleanTheme}. Photorealistic, highly detailed, professional photography, studio lighting.`

      const { output } = await client.run('black-forest-labs/flux-schnell', {
        input: {
          prompt,
          width: 1024,
          height: 1024
        }
      })

      const imageUrl = output[0] as string
      setGeneratedImage(imageUrl)

      // Add to history
      const newHistoryItem = {
        theme: theme,
        imageUrl,
        timestamp: Date.now()
      }
      setHistory([newHistoryItem, ...history].slice(0, 12)) // Keep last 12 generations

    } catch (err: any) {
      console.error('Generation failed:', err)

      if (err.type === 'insufficient_credits') {
        setError('Insufficient credits. Please upgrade your subscription to continue generating cats.')
      } else if (err.type === 'rate_limit_exceeded') {
        const waitTime = Math.ceil((err.retryAfter || 60000) / 1000)
        setError(`Rate limit exceeded. Please wait ${waitTime} seconds before trying again.`)
      } else {
        setError('Failed to generate cat image. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleThemeClick = (theme: string) => {
    generateCat(theme)
    setCustomTheme('')
  }

  const handleCustomGenerate = () => {
    if (customTheme.trim()) {
      generateCat(customTheme)
    }
  }

  return (
    <div className="cat-generator">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="title">🐱 Cute Cat Generator</h1>
          <div className="user-section">
            <div className="user-info">
              <span className="user-email">{user?.email}</span>
              <div className="credits-badge">
                💳 {usage?.remainingCredits ?? 0} credits
              </div>
            </div>
            <div className="header-actions">
              <button onClick={subscribe!} className="subscribe-button">
                {subscriptionStatus?.hasActiveSubscription ? 'Manage Plan' : 'Upgrade'}
              </button>
              <button onClick={signOut} className="sign-out-button">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Prompt Section */}
        <section className="prompt-section">
          <h2>Choose a Theme</h2>
          <div className="theme-grid">
            {predefinedThemes.map((theme) => (
              <button
                key={theme}
                onClick={() => handleThemeClick(theme)}
                disabled={loading}
                className="theme-button"
              >
                {theme}
              </button>
            ))}
          </div>

          <div className="custom-theme">
            <input
              type="text"
              value={customTheme}
              onChange={(e) => setCustomTheme(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCustomGenerate()}
              placeholder="Or enter your own theme... (e.g., 'Cotton Candy', 'Autumn Leaves')"
              disabled={loading}
              className="custom-input"
            />
            <button
              onClick={handleCustomGenerate}
              disabled={loading || !customTheme.trim()}
              className="generate-button"
            >
              Generate
            </button>
          </div>
        </section>

        {/* Status Messages */}
        {loading && (
          <div className="status-message loading">
            <div className="spinner"></div>
            <p>Generating your cute cat... This may take a few moments</p>
          </div>
        )}

        {error && (
          <div className="status-message error">
            <p>❌ {error}</p>
            {error.includes('Insufficient credits') && (
              <button onClick={subscribe!} className="upgrade-button">
                Upgrade Now
              </button>
            )}
          </div>
        )}

        {/* Generated Image */}
        {generatedImage && !loading && (
          <section className="result-section">
            <h2>Your Generated Cat</h2>
            <div className="image-container">
              <img src={generatedImage} alt="Generated cat" className="generated-image" />
              <a href={generatedImage} download className="download-button">
                ⬇️ Download Image
              </a>
            </div>
          </section>
        )}

        {/* History */}
        {history.length > 0 && (
          <section className="history-section">
            <div className="history-header">
              <h2>Recent Generations</h2>
              <span className="sync-status">
                {historySync === 'synced' && '✓ Synced'}
                {historySync === 'syncing' && '⟳ Syncing...'}
                {historySync === 'error' && '⚠️ Sync Error'}
                {historySync === 'local' && '💾 Local'}
              </span>
            </div>
            <div className="history-grid">
              {history.map((item, index) => (
                <div key={index} className="history-item">
                  <img src={item.imageUrl} alt={item.theme} />
                  <div className="history-overlay">
                    <span className="history-theme">{item.theme}</span>
                    <span className="history-time">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Subscription Info */}
        <section className="info-section">
          <div className="info-card">
            <h3>Your Plan</h3>
            <p className="plan-name">{subscriptionStatus?.plan?.name ?? 'Free'}</p>
            <p className="plan-status">Status: {subscriptionStatus?.status ?? 'none'}</p>
          </div>
          <div className="info-card">
            <h3>Usage</h3>
            <p>Allocated: {usage?.allocatedCredits ?? 0}</p>
            <p>Used: {usage?.usedCredits ?? 0}</p>
            <p>Remaining: {usage?.remainingCredits ?? 0}</p>
          </div>
        </section>
      </main>
    </div>
  )
}

// Main component that handles conditional rendering
export default function App() {
  const { isSignedIn, signIn } = useSubscribeDev()

  return isSignedIn ? <CatGeneratorApp /> : <SignInScreen signIn={signIn} />
}