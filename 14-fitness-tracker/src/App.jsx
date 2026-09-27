import React, { useState } from 'react';
import {
  Flame,
  Activity,
  Heart,
  Moon,
  Zap,
  Trophy,
  PlusCircle,
  RefreshCw,
  Sliders,
  Watch,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Dumbbell,
  Timer,
  Droplet,
  Footprints,
  TrendingUp,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    user,
    goals,
    dailyProgress,
    weeklyTrends,
    sleepTelemetry,
    exerciseLibrary,
    workoutLogs,
    achievements,
    recommendations,
    isSyncingWearable,
    connectedDevice,
    logWorkout,
    updateGoals,
    syncWearableData
  } = useStore();

  const [activeTab, setActiveTab] = useState('telemetry');
  const [showLogModal, setShowLogModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Strength');
  const [newDuration, setNewDuration] = useState('45');
  const [newCalories, setNewCalories] = useState('450');
  const [newNotes, setNewNotes] = useState('');
  const [exerciseSearch, setExerciseSearch] = useState('');

  // Circular gauge math
  const stepPercent = Math.min(100, Math.round((dailyProgress.steps / goals.steps) * 100));
  const caloriePercent = Math.min(100, Math.round((dailyProgress.calories / goals.calories) * 100));
  const activePercent = Math.min(100, Math.round((dailyProgress.activeMinutes / goals.activeMinutes) * 100));
  const waterPercent = Math.min(100, Math.round((dailyProgress.waterLiters / goals.waterLiters) * 100));

  const handleCreateWorkout = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    logWorkout({
      title: newTitle,
      category: newCategory,
      durationMinutes: Number(newDuration),
      caloriesBurned: Number(newCalories),
      exercises: [
        { name: newTitle, sets: `${newDuration} min continuous protocol`, rpe: 8.5 }
      ]
    });
    setNewTitle('');
    setShowLogModal(false);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans">
      {/* High-Energy Kinetic Header */}
      <header className="sticky top-0 z-40 bg-[#121215]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff5500] to-[#ff8800] p-0.5 flex items-center justify-center shadow-lg shadow-[#ff5500]/20">
              <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#ff5500] animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-condensed text-2xl font-black tracking-wider text-white uppercase italic">
                  PULSE // KINETIC
                </span>
                <span className="bg-[#ff5500]/20 text-[#ff5500] border border-[#ff5500]/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  BIO-SYNC v3.9
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400">
                ATHLETE: {user.name} • {user.athleteTier}
              </p>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="hidden md:flex items-center gap-1 bg-[#18181b] p-1 rounded-xl border border-zinc-800 text-xs font-semibold">
            {[
              { id: 'telemetry', label: 'Telemetry & Rings', icon: Activity },
              { id: 'workouts', label: 'Workout Vault', icon: Dumbbell },
              { id: 'recovery', label: 'Recovery & Sleep', icon: Moon },
              { id: 'achievements', label: 'Badges', icon: Trophy },
              { id: 'goals', label: 'Goal Targets', icon: Sliders }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                    activeTab === tab.id
                      ? 'bg-[#ff5500] text-black font-black uppercase tracking-wider shadow-md shadow-[#ff5500]/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Device Sync & Heart Rate */}
          <div className="flex items-center gap-3">
            <button
              onClick={syncWearableData}
              disabled={isSyncingWearable}
              className="px-3 py-1.5 bg-[#18181b] hover:bg-zinc-800 border border-zinc-700/80 rounded-xl text-xs font-mono text-zinc-300 flex items-center gap-2 transition"
              title={connectedDevice}
            >
              <Watch className={`w-3.5 h-3.5 ${isSyncingWearable ? 'animate-spin text-[#ff5500]' : 'text-emerald-400'}`} />
              <span className="hidden sm:inline">{isSyncingWearable ? 'Syncing...' : 'Garmin Sync'}</span>
            </button>

            <div className="flex items-center gap-2 bg-[#18181b] border border-[#ff5500]/30 px-3 py-1.5 rounded-xl font-mono text-xs">
              <Heart className="w-4 h-4 text-[#ff5500] fill-[#ff5500] animate-bounce" />
              <span className="font-condensed font-bold text-base text-white">{user.currentHeartRate}</span>
              <span className="text-[10px] text-zinc-400">BPM</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 w-full flex-1 space-y-8">
        {/* VIEW 1: TELEMETRY & PROGRESS RINGS */}
        {activeTab === 'telemetry' && (
          <div className="space-y-8">
            {/* Top Kinetic Hero Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Ring 1: Steps */}
              <div className="bg-[#121215] border border-zinc-800/80 rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                    <Footprints className="w-4 h-4 text-[#ff5500]" /> Daily Steps
                  </span>
                  <span className="text-xs font-mono text-[#ff5500] font-bold">{stepPercent}%</span>
                </div>
                <div className="my-4 flex items-baseline gap-2">
                  <span className="font-condensed text-4xl lg:text-5xl font-black text-white tracking-tight">
                    {dailyProgress.steps.toLocaleString()}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">/ {goals.steps.toLocaleString()}</span>
                </div>
                <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#ff5500] to-[#ff8800] rounded-full" style={{ width: `${stepPercent}%` }} />
                </div>
              </div>

              {/* Ring 2: Active Calories */}
              <div className="bg-[#121215] border border-zinc-800/80 rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-[#ff8800]" /> Active Energy
                  </span>
                  <span className="text-xs font-mono text-[#ff8800] font-bold">{caloriePercent}%</span>
                </div>
                <div className="my-4 flex items-baseline gap-2">
                  <span className="font-condensed text-4xl lg:text-5xl font-black text-white tracking-tight">
                    {dailyProgress.calories.toLocaleString()}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">/ {goals.calories.toLocaleString()} kcal</span>
                </div>
                <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#ff8800] to-yellow-500 rounded-full" style={{ width: `${caloriePercent}%` }} />
                </div>
              </div>

              {/* Ring 3: Active Minutes */}
              <div className="bg-[#121215] border border-zinc-800/80 rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                    <Timer className="w-4 h-4 text-emerald-400" /> Kinetic Zone
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">{activePercent}%</span>
                </div>
                <div className="my-4 flex items-baseline gap-2">
                  <span className="font-condensed text-4xl lg:text-5xl font-black text-white tracking-tight">
                    {dailyProgress.activeMinutes}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">/ {goals.activeMinutes} mins</span>
                </div>
                <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: `${activePercent}%` }} />
                </div>
              </div>

              {/* Ring 4: Recovery Index */}
              <div className="bg-[#121215] border border-zinc-800/80 rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-cyan-400" /> Recovery Readiness
                  </span>
                  <span className="text-xs font-mono text-cyan-400 font-bold">Optimal</span>
                </div>
                <div className="my-4 flex items-baseline gap-2">
                  <span className="font-condensed text-4xl lg:text-5xl font-black text-white tracking-tight">
                    {user.recoveryScore}%
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">Strain: 14.8</span>
                </div>
                <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full" style={{ width: `${user.recoveryScore}%` }} />
                </div>
              </div>
            </div>

            {/* Central Bio-Telemetry & Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 7-Day Strain & Energy Histogram */}
              <div className="lg:col-span-2 bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-condensed text-2xl font-bold uppercase tracking-wide text-white">
                      Weekly Kinetic Load & Output
                    </h2>
                    <p className="text-xs text-zinc-400 font-mono">Calculated active caloric burn across consecutive 24h cycles</p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#18181b] px-3 py-1.5 rounded-xl border border-zinc-800 text-xs font-mono">
                    <TrendingUp className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span className="text-[#ff5500] font-bold">+18.4%</span> vs last week
                  </div>
                </div>

                <div className="h-48 flex items-end justify-between gap-3 pt-4 px-2">
                  {weeklyTrends.map((day) => {
                    const heightPercent = Math.round((day.calories / 3500) * 100);
                    return (
                      <div key={day.day} className="flex-1 flex flex-col items-center gap-2 group">
                        <span className="text-[10px] font-mono text-zinc-400 group-hover:text-white transition">
                          {day.calories}
                        </span>
                        <div className="w-full bg-zinc-800/60 rounded-xl h-36 flex items-end p-1 overflow-hidden">
                          <div
                            className="w-full bg-gradient-to-t from-[#ff5500] to-[#ff8800] rounded-lg transition-all duration-500 group-hover:from-yellow-400 group-hover:to-[#ff5500]"
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold font-mono text-zinc-300">{day.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Kinetic Recommendations Engine */}
              <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#ff5500] text-xs font-mono uppercase font-bold tracking-widest">
                    <Sparkles className="w-4 h-4" /> Adaptive Bio-Advisor
                  </div>
                  <h3 className="font-condensed text-xl font-bold uppercase text-white mt-1">
                    Kinetic Protocol Insights
                  </h3>
                </div>

                <div className="space-y-3 flex-1">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="p-4 rounded-2xl bg-[#18181b] border border-zinc-800/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#ff5500]/10 text-[#ff5500] font-bold border border-[#ff5500]/20">
                          {rec.type}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{rec.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">{rec.body}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowLogModal(true)}
                  className="w-full py-3 bg-[#ff5500] hover:bg-[#ff6600] text-black font-condensed font-black text-lg uppercase tracking-wider rounded-2xl transition shadow-lg shadow-[#ff5500]/20 flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" /> Log Kinetic Session
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: WORKOUT VAULT & LOGGER */}
        {activeTab === 'workouts' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121215] border border-zinc-800 p-6 rounded-3xl">
              <div>
                <h2 className="font-condensed text-2xl font-black uppercase text-white tracking-wide">
                  Exercise Matrix & Kinetic Log
                </h2>
                <p className="text-xs text-zinc-400 font-mono">Logged physiological sessions and tactical exercise library</p>
              </div>
              <button
                onClick={() => setShowLogModal(true)}
                className="px-5 py-2.5 bg-[#ff5500] hover:bg-[#ff6600] text-black font-condensed font-black uppercase tracking-wider rounded-xl transition shadow-md shadow-[#ff5500]/20 flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" /> Quick Log Workout
              </button>
            </div>

            {/* Workout History */}
            <div className="space-y-4">
              {workoutLogs.map((log) => (
                <div key={log.id} className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#ff5500]/10 border border-[#ff5500]/30 flex items-center justify-center text-[#ff5500]">
                        <Dumbbell className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{log.title}</h3>
                        <span className="text-xs font-mono text-zinc-400">{log.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div className="bg-[#18181b] px-3 py-1.5 rounded-xl border border-zinc-800">
                        <span className="text-zinc-400">Duration: </span>
                        <span className="text-white font-bold">{log.durationMinutes}m</span>
                      </div>
                      <div className="bg-[#18181b] px-3 py-1.5 rounded-xl border border-zinc-800">
                        <span className="text-zinc-400">Burn: </span>
                        <span className="text-[#ff5500] font-bold">{log.caloriesBurned} kcal</span>
                      </div>
                      <div className="bg-[#18181b] px-3 py-1.5 rounded-xl border border-zinc-800">
                        <span className="text-zinc-400">Avg HR: </span>
                        <span className="text-emerald-400 font-bold">{log.avgHeartRate} bpm</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {log.exercises.map((ex, idx) => (
                      <div key={idx} className="bg-[#18181b] p-3 rounded-2xl border border-zinc-800/80 flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-zinc-200">{ex.name}</h4>
                          <p className="text-[11px] font-mono text-zinc-400">{ex.sets}</p>
                        </div>
                        <span className="text-[10px] font-mono bg-zinc-800 px-2 py-0.5 rounded text-[#ff5500] font-bold">
                          RPE {ex.rpe}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Searchable Exercise Library */}
            <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-condensed text-xl font-bold uppercase text-white">
                  Tactical Movement Library
                </h3>
                <input
                  type="text"
                  placeholder="Filter movement patterns..."
                  value={exerciseSearch}
                  onChange={(e) => setExerciseSearch(e.target.value)}
                  className="bg-[#18181b] border border-zinc-700/80 px-3.5 py-1.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff5500]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {exerciseLibrary
                  .filter((ex) => ex.name.toLowerCase().includes(exerciseSearch.toLowerCase()) || ex.category.toLowerCase().includes(exerciseSearch.toLowerCase()))
                  .map((ex) => (
                    <div key={ex.id} className="p-4 bg-[#18181b] border border-zinc-800/80 rounded-2xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                          {ex.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#ff5500] font-bold">MET {ex.met}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{ex.name}</h4>
                      <p className="text-[11px] text-zinc-400">{ex.muscle}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: RECOVERY & SLEEP TELEMETRY */}
        {activeTab === 'recovery' && (
          <div className="space-y-6">
            <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-widest">
                  Circadian & Autonomous Sync
                </span>
                <h2 className="font-condensed text-2xl font-black uppercase text-white mt-1">
                  Nocturnal Sleep Staging & HRV Dynamics
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-[#18181b] rounded-2xl border border-zinc-800 space-y-1">
                  <span className="text-xs text-zinc-400 font-mono uppercase">Total Asleep Duration</span>
                  <div className="font-condensed text-3xl font-black text-white">{sleepTelemetry.totalDuration}</div>
                  <span className="text-[10px] font-mono text-emerald-400">Sleep Efficiency: {sleepTelemetry.efficiency}</span>
                </div>
                <div className="p-5 bg-[#18181b] rounded-2xl border border-zinc-800 space-y-1">
                  <span className="text-xs text-zinc-400 font-mono uppercase">Deep Slow-Wave Stage</span>
                  <div className="font-condensed text-3xl font-black text-indigo-400">{sleepTelemetry.deepSleep}</div>
                  <span className="text-[10px] font-mono text-zinc-400">Cellular & Muscle Regeneration</span>
                </div>
                <div className="p-5 bg-[#18181b] rounded-2xl border border-zinc-800 space-y-1">
                  <span className="text-xs text-zinc-400 font-mono uppercase">HRV Baseline Mean</span>
                  <div className="font-condensed text-3xl font-black text-cyan-400">{sleepTelemetry.hrvBaseline}</div>
                  <span className="text-[10px] font-mono text-cyan-400">Parasympathetic Tone Balanced</span>
                </div>
              </div>

              {/* Sleep Stage Visual Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Sleep Stage Architecture Breakdown</span>
                  <span>Target: 25% Deep // 25% REM</span>
                </div>
                <div className="h-6 w-full bg-zinc-800 rounded-xl overflow-hidden flex">
                  <div className="h-full bg-indigo-600" style={{ width: '25%' }} title="Deep Sleep 25%" />
                  <div className="h-full bg-purple-500" style={{ width: '28%' }} title="REM Sleep 28%" />
                  <div className="h-full bg-blue-400/60" style={{ width: '47%' }} title="Light Sleep 47%" />
                </div>
                <div className="flex items-center gap-6 text-[11px] font-mono pt-1 text-zinc-400">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Deep (25%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> REM (28%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-400/60" /> Light (47%)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: ACHIEVEMENTS & BADGES */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-condensed text-2xl font-black uppercase text-white">
                    Discipline & Milestone Commendations
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono">Verified achievement milestones unlocked through sustained training volume</p>
                </div>
                <div className="font-mono text-xs bg-[#ff5500]/20 text-[#ff5500] border border-[#ff5500]/40 px-3 py-1 rounded-xl font-bold">
                  {achievements.filter((a) => a.unlocked).length} / {achievements.length} UNLOCKED
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className={`p-5 rounded-3xl border transition flex items-start gap-4 ${
                      ach.unlocked
                        ? 'bg-[#18181b] border-[#ff5500]/40 shadow-lg shadow-[#ff5500]/10'
                        : 'bg-[#121215] border-zinc-800/80 opacity-50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      ach.unlocked ? 'bg-[#ff5500] text-black' : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-base font-condensed uppercase tracking-wide">
                          {ach.title}
                        </h4>
                        {ach.unlocked && (
                          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> VERIFIED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{ach.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: GOAL TARGET CONFIGURATOR */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-6">
              <div>
                <h2 className="font-condensed text-2xl font-black uppercase text-white">
                  Physiological Target Thresholds
                </h2>
                <p className="text-xs text-zinc-400 font-mono">Fine-tune daily kinetic volume, calorie thresholds, and sleep quotas</p>
              </div>

              <div className="space-y-6 max-w-xl">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-300">Daily Step Target</span>
                    <span className="text-[#ff5500] font-bold">{goals.steps.toLocaleString()} steps</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="25000"
                    step="500"
                    value={goals.steps}
                    onChange={(e) => updateGoals({ steps: Number(e.target.value) })}
                    className="w-full accent-[#ff5500]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-300">Active Caloric Target</span>
                    <span className="text-[#ff8800] font-bold">{goals.calories.toLocaleString()} kcal</span>
                  </div>
                  <input
                    type="range"
                    min="1500"
                    max="4500"
                    step="50"
                    value={goals.calories}
                    onChange={(e) => updateGoals({ calories: Number(e.target.value) })}
                    className="w-full accent-[#ff8800]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-300">Target Active Minutes</span>
                    <span className="text-emerald-400 font-bold">{goals.activeMinutes} mins</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="180"
                    step="5"
                    value={goals.activeMinutes}
                    onChange={(e) => updateGoals({ activeMinutes: Number(e.target.value) })}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: LOG WORKOUT */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-zinc-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-condensed text-xl font-bold uppercase text-white">Log Kinetic Session</h3>
              <button onClick={() => setShowLogModal(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateWorkout} className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Session Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Heavy Clean & Jerk Conditioning"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#121215] border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#ff5500]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Duration (Min)</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full bg-[#121215] border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Calories (Burn)</label>
                  <input
                    type="number"
                    value={newCalories}
                    onChange={(e) => setNewCalories(e.target.value)}
                    className="w-full bg-[#121215] border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="w-1/2 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#ff5500] hover:bg-[#ff6600] text-black font-condensed font-black text-base uppercase rounded-xl shadow-lg shadow-[#ff5500]/30 transition"
                >
                  Commit Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Kinetic Footer */}
      <footer className="border-t border-zinc-900 bg-[#09090b] py-6 text-center text-xs text-zinc-600 font-mono">
        © 2026 PULSE KINETIC PERFORMANCE SYSTEMS. CLOUD REAL-TIME TELEMETRY STREAMING.
      </footer>
    </div>
  );
}
