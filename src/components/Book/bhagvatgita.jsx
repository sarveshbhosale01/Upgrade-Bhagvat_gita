import React, { useState, useEffect } from 'react';
import './bhagvatgita.css';

const BhagavadGita = () => {
  const [gitaData, setGitaData] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [activeTab, setActiveTab] = useState('chapters');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredChapters, setFilteredChapters] = useState([]);

  // All 18 chapters data
  const allChapters = [
    {
      id: 1,
      name: "Arjuna Vishada Yoga",
      translation: "The Yoga of Arjuna's Dejection",
      summary: "Arjuna's moral dilemma and grief on the battlefield of Kurukshetra",
      verseCount: 47,
      keyConcepts: ["Dharma", "Moral Dilemma", "Duty", "Compassion"]
    },
    {
      id: 2,
      name: "Sankhya Yoga",
      translation: "The Yoga of Knowledge",
      summary: "The eternal nature of the soul and the concept of Nishkama Karma",
      verseCount: 72,
      keyConcepts: ["Atman", "Nishkama Karma", "Stithaprajna", "Immortality of Soul"]
    },
    {
      id: 3,
      name: "Karma Yoga",
      translation: "The Yoga of Action",
      summary: "The path of selfless action and performance of duty",
      verseCount: 43,
      keyConcepts: ["Karma Yoga", "Selfless Action", "Yajna", "Lokasangraha"]
    },
    {
      id: 4,
      name: "Jnana Karma Sanyasa Yoga",
      translation: "The Yoga of Knowledge and Renunciation of Action",
      summary: "The divine knowledge and the science of action without attachment",
      verseCount: 42,
      keyConcepts: ["Jnana Yoga", "Divine Manifestation", "Yajna", "Self-realization"]
    },
    {
      id: 5,
      name: "Karma Sanyasa Yoga",
      translation: "The Yoga of Renunciation of Action",
      summary: "The harmony between renunciation and action",
      verseCount: 29,
      keyConcepts: ["Sanyasa", "Tyaga", "Detachment", "Inner Peace"]
    },
    {
      id: 6,
      name: "Dhyana Yoga",
      translation: "The Yoga of Meditation",
      summary: "The practice of meditation and control of the mind",
      verseCount: 47,
      keyConcepts: ["Meditation", "Mind Control", "Yogi", "Self-realization"]
    },
    {
      id: 7,
      name: "Jnana Vijnana Yoga",
      translation: "The Yoga of Knowledge and Realization",
      summary: "The supreme knowledge and the divine nature",
      verseCount: 30,
      keyConcepts: ["Para Prakriti", "Apara Prakriti", "Divine Nature", "Surrender"]
    },
    {
      id: 8,
      name: "Akshara Brahma Yoga",
      translation: "The Yoga of the Imperishable Brahman",
      summary: "The path to the supreme abode and the cycle of rebirth",
      verseCount: 28,
      keyConcepts: ["Akshara", "Brahman", "Rebirth", "Supreme Abode"]
    },
    {
      id: 9,
      name: "Raja Vidya Raja Guhya Yoga",
      translation: "The Yoga of Royal Knowledge and Royal Secret",
      summary: "The supreme knowledge and the most confidential knowledge",
      verseCount: 34,
      keyConcepts: ["Raja Vidya", "Bhakti", "Divine Protection", "Universal Form"]
    },
    {
      id: 10,
      name: "Vibhuti Yoga",
      translation: "The Yoga of Divine Glories",
      summary: "The manifestation of divine opulences and powers",
      verseCount: 42,
      keyConcepts: ["Vibhuti", "Divine Manifestation", "Opulence", "Supreme"]
    },
    {
      id: 11,
      name: "Vishwarupa Darshana Yoga",
      translation: "The Yoga of the Vision of the Universal Form",
      summary: "Arjuna witnesses the cosmic form of Lord Krishna",
      verseCount: 55,
      keyConcepts: ["Vishwarupa", "Cosmic Form", "Divine Vision", "Awe"]
    },
    {
      id: 12,
      name: "Bhakti Yoga",
      translation: "The Yoga of Devotion",
      summary: "The path of devotion and loving service to the Supreme",
      verseCount: 20,
      keyConcepts: ["Bhakti", "Devotion", "Love", "Surrender"]
    },
    {
      id: 13,
      name: "Ksetra Ksetrajna Vibhaga Yoga",
      translation: "The Yoga of the Field and the Knower of the Field",
      summary: "The distinction between the body, soul, and consciousness",
      verseCount: 34,
      keyConcepts: ["Kshetra", "Kshetrajna", "Prakriti", "Purusha"]
    },
    {
      id: 14,
      name: "Gunatraya Vibhaga Yoga",
      translation: "The Yoga of the Division of the Three Gunas",
      summary: "The three modes of material nature and transcending them",
      verseCount: 27,
      keyConcepts: ["Sattva", "Rajas", "Tamas", "Gunatita"]
    },
    {
      id: 15,
      name: "Purushottama Yoga",
      translation: "The Yoga of the Supreme Person",
      summary: "The supreme spirit and the eternal tree of life",
      verseCount: 20,
      keyConcepts: ["Purushottama", "Akshara", "Kshara", "Supreme Being"]
    },
    {
      id: 16,
      name: "Daivasura Sampad Vibhaga Yoga",
      translation: "The Yoga of the Division between the Divine and Demoniac Natures",
      summary: "The distinction between divine and demoniac qualities",
      verseCount: 24,
      keyConcepts: ["Daivi Sampat", "Asuri Sampat", "Divine Nature", "Demoniac Nature"]
    },
    {
      id: 17,
      name: "Shraddha Traya Vibhaga Yoga",
      translation: "The Yoga of the Threefold Division of Faith",
      summary: "The three types of faith, food, sacrifice, and austerity",
      verseCount: 28,
      keyConcepts: ["Shraddha", "Threefold Faith", "Austerity", "Sacrifice"]
    },
    {
      id: 18,
      name: "Moksha Sanyasa Yoga",
      translation: "The Yoga of Liberation and Renunciation",
      summary: "The conclusion - renunciation and the supreme secret of all secrets",
      verseCount: 78,
      keyConcepts: ["Moksha", "Sanyasa", "Tyaga", "Supreme Secret"]
    }
  ];

  // Load data from JSON file
  useEffect(() => {
    const loadGitaData = async () => {
      try {
        setLoading(true);
        const possiblePaths = [
          '/Book/data.json',
          './Book/data.json',
          '../Book/data.json',
          'Book/data.json',
          '/data.json',
          './data.json'
        ];

        let data = null;
        
        for (const path of possiblePaths) {
          try {
            const response = await fetch(path);
            if (response.ok) {
              data = await response.json();
              console.log('Data loaded successfully from:', path);
              break;
            }
          } catch (err) {
            continue;
          }
        }

        if (data) {
          setGitaData({
            ...data,
            chapters: data.chapters || allChapters
          });
        } else {
          setGitaData(getMockData());
        }
      } catch (err) {
        console.error('Error loading Gita data:', err);
        setError('Failed to load Bhagavad Gita data');
        setGitaData(getMockData());
      } finally {
        setLoading(false);
      }
    };

    loadGitaData();
  }, []);

  // Filter chapters based on search term
  useEffect(() => {
    if (gitaData && gitaData.chapters) {
      const filtered = gitaData.chapters.filter(chapter => 
        chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.keyConcepts.some(concept => 
          concept.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        chapter.id.toString().includes(searchTerm)
      );
      setFilteredChapters(filtered);
    }
  }, [searchTerm, gitaData]);

  // Mock data as fallback
  const getMockData = () => ({
    metadata: {
      title: "Bhagavad Gita",
      chapters: 18,
      verses: 700,
      language: "Sanskrit"
    },
    chapters: allChapters,
    keyTeachings: {
      coreConcepts: [
        "Dharma (Righteous Duty)",
        "Karma Yoga (Path of Selfless Action)",
        "Bhakti Yoga (Path of Devotion)",
        "Jnana Yoga (Path of Knowledge)",
        "Atman (The Eternal Soul)",
        "Moksha (Liberation)",
        "Sanyasa (Renunciation)",
        "Nishkama Karma (Selfless Action)"
      ],
      yogas: [
        {
          name: "Karma Yoga",
          description: "The path of selfless action without attachment to results",
          chapter: 3
        },
        {
          name: "Bhakti Yoga", 
          description: "The path of devotion and surrender to the Divine",
          chapter: 12
        },
        {
          name: "Jnana Yoga",
          description: "The path of knowledge and discrimination between real and unreal",
          chapter: 4
        },
        {
          name: "Dhyana Yoga",
          description: "The path of meditation and mind control",
          chapter: 6
        },
        {
          name: "Raja Yoga",
          description: "The royal path combining all yogic practices",
          chapter: 6
        }
      ]
    }
  });

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    setSelectedVerse(null);
    setActiveTab('chapter-details');
  };

  const handleVerseSelect = (verse) => {
    setSelectedVerse(verse);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Bhagavad Gita Wisdom...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Bhagavad Gita</h2>
        <p>{error}</p>
        <p>Showing sample data instead.</p>
      </div>
    );
  }

  if (!gitaData) {
    return (
      <div className="error-container">
        <h2>No Data Available</h2>
        <p>Please check if the data.json file exists in the correct location.</p>
      </div>
    );
  }

  return (
    <div className="bhagavad-gita-container">
      <header className="gita-header">
        <h1> {gitaData.metadata?.title || "Bhagavad Gita"}</h1>
        <div className="metadata">
          <span>📖 Chapters: {gitaData.metadata?.chapters || 18}</span>
          <span>📜 Verses: {gitaData.metadata?.verses || 700}</span>
          <span>🔤 Language: {gitaData.metadata?.language || "Sanskrit"}</span>
        </div>
      </header>

      <nav className="gita-nav">
        <button 
          className={activeTab === 'chapters' ? 'active' : ''}
          onClick={() => setActiveTab('chapters')}
        >
          📚 Chapters
        </button>
        <button 
          className={activeTab === 'teachings' ? 'active' : ''}
          onClick={() => setActiveTab('teachings')}
        >
          💡 Key Teachings
        </button>
        <button 
          className={activeTab === 'yogas' ? 'active' : ''}
          onClick={() => setActiveTab('yogas')}
        >
          🧘 Paths of Yoga
        </button>
      </nav>

      <main className="gita-content">
        {activeTab === 'chapters' && (
          <div className="chapters-section">
            <div className="search-section">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="🔍 Search chapters by name, translation, concepts, or chapter number..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                {searchTerm && (
                  <button onClick={clearSearch} className="clear-search">
                    ✕
                  </button>
                )}
              </div>
              {searchTerm && (
                <div className="search-results-info">
                  Found {filteredChapters.length} chapter{filteredChapters.length !== 1 ? 's' : ''} matching "{searchTerm}"
                </div>
              )}
            </div>
            
            <ChapterList 
              chapters={searchTerm ? filteredChapters : gitaData.chapters || []}
              onChapterSelect={handleChapterSelect}
              searchTerm={searchTerm}
            />
          </div>
        )}

        {activeTab === 'teachings' && (
          <TeachingsList teachings={gitaData.keyTeachings || { coreConcepts: [] }} />
        )}

        {activeTab === 'yogas' && (
          <YogaList yogas={gitaData.keyTeachings?.yogas || []} />
        )}

        {activeTab === 'chapter-details' && selectedChapter && (
          <ChapterDetail 
            chapter={selectedChapter}
            selectedVerse={selectedVerse}
            onVerseSelect={handleVerseSelect}
            onBack={() => setActiveTab('chapters')}
          />
        )}
      </main>
    </div>
  );
};

// Chapter List Component
const ChapterList = ({ chapters, onChapterSelect, searchTerm }) => (
  <div className="chapter-list">
    <h2>
      {searchTerm ? 'Search Results' : 'Chapters of Bhagavad Gita'}
      <span className="chapters-count"> ({chapters.length})</span>
    </h2>
    
    {chapters.length === 0 ? (
      <div className="no-data">
        <p>No chapters found matching your search.</p>
        <p>Try searching by chapter name, translation, or key concepts.</p>
      </div>
    ) : (
      <div className="chapters-grid">
        {chapters.map(chapter => (
          <div 
            key={chapter.id} 
            className="chapter-card"
            onClick={() => onChapterSelect(chapter)}
          >
            <div className="chapter-number">Chapter {chapter.id}</div>
            <h3 className="chapter-name">{chapter.name}</h3>
            <h4 className="chapter-translation">{chapter.translation}</h4>
            <p className="chapter-summary">{chapter.summary}</p>
            <div className="chapter-meta">
              <span className="verse-count">📜 {chapter.verseCount} verses</span>
            </div>
            <div className="concepts">
              {chapter.keyConcepts?.map((concept, index) => (
                <span key={index} className="concept-tag">{concept}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Chapter Detail Component
const ChapterDetail = ({ chapter, selectedVerse, onVerseSelect, onBack }) => (
  <div className="chapter-detail">
    <button className="back-button" onClick={onBack}>
      ← Back to Chapters
    </button>
    
    <div className="chapter-header">
      <div className="chapter-title">
        <h2>Chapter {chapter.id}: {chapter.name}</h2>
        <h3>{chapter.translation}</h3>
      </div>
      <p className="chapter-summary">{chapter.summary}</p>
      <div className="chapter-stats">
        <span>📜 Total Verses: {chapter.verseCount}</span>
        <span>💡 Key Concepts: {chapter.keyConcepts?.join(', ')}</span>
      </div>
    </div>

    <div className="verses-section">
      <h4>Verses Overview</h4>
      {chapter.verses && chapter.verses.length > 0 ? (
        <div className="verses-list">
          {chapter.verses.map(verse => (
            <div 
              key={verse.verse} 
              className={`verse-card ${selectedVerse?.verse === verse.verse ? 'selected' : ''}`}
              onClick={() => onVerseSelect(verse)}
            >
              <div className="verse-header">
                <span className="verse-number">Verse {verse.verse}</span>
              </div>
              <div className="sanskrit">{verse.sanskrit}</div>
              <div className="translation">{verse.translation}</div>
              {selectedVerse?.verse === verse.verse && (
                <div className="verse-meaning">
                  <strong>Meaning:</strong> {verse.meaning}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data">
          <p>Detailed verses data will be available soon.</p>
          <p>This chapter contains {chapter.verseCount} verses discussing {chapter.keyConcepts?.join(', ').toLowerCase()}.</p>
        </div>
      )}
    </div>
  </div>
);

// Teachings Component
const TeachingsList = ({ teachings }) => (
  <div className="teachings-list">
    <h2>Core Concepts of Bhagavad Gita</h2>
    {teachings.coreConcepts && teachings.coreConcepts.length > 0 ? (
      <div className="concepts-grid">
        {teachings.coreConcepts.map((concept, index) => (
          <div key={index} className="concept-card">
            <div className="concept-icon">💡</div>
            <h3>{concept}</h3>
          </div>
        ))}
      </div>
    ) : (
      <div className="no-data">
        <p>No teachings data available.</p>
      </div>
    )}
  </div>
);

// Yoga Paths Component
const YogaList = ({ yogas }) => (
  <div className="yoga-list">
    <h2>Paths of Yoga in Bhagavad Gita</h2>
    {yogas.length > 0 ? (
      <div className="yogas-grid">
        {yogas.map((yoga, index) => (
          <div key={index} className="yoga-card">
            <div className="yoga-icon">🧘</div>
            <h3>{yoga.name}</h3>
            <p>{yoga.description}</p>
            <span className="chapter-ref">📖 Chapter {yoga.chapter}</span>
          </div>
        ))}
      </div>
    ) : (
      <div className="no-data">
        <p>No yoga paths data available.</p>
      </div>
    )}
  </div>
);

export default BhagavadGita;