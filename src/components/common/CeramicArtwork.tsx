'use client';

import React from 'react';
import { IllustrationType, CeramicGlaze } from '@/types';

interface CeramicArtworkProps {
  type: IllustrationType;
  glaze?: CeramicGlaze;
  badgeText?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  imageUrl?: string;
  showSeal?: boolean;
}

export function SealStamp({ text = 'Bát Tràng', subtext = 'Cổ Nghệ', className = '' }: { text?: string; subtext?: string; className?: string }) {
  return (
    <div className={`inline-flex flex-col items-center justify-center p-1.5 border-2 border-[#8B1E1F] bg-[#8B1E1F]/5 text-[#8B1E1F] rounded-xs select-none shadow-[inset_0_0_0_1px_rgba(139,30,31,0.25)] ${className}`}>
      <span className="text-[10px] font-bold tracking-widest uppercase font-serif leading-none">{text}</span>
      {subtext && <span className="text-[8px] tracking-wider uppercase font-serif opacity-90 scale-90 leading-none mt-0.5">{subtext}</span>}
    </div>
  );
}

export function OrientalOrnament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 text-[#C5A059] ${className}`}>
      <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]" />
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
      <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]" />
    </div>
  );
}

export function CloudLotusDivider({ title, subtitle, className = '' }: { title?: string; subtitle?: string; className?: string }) {
  return (
    <div className={`text-center my-6 flex flex-col items-center ${className}`}>
      <div className="flex items-center justify-center gap-3">
        {/* Left Cloud Flourish */}
        <svg width="36" height="16" viewBox="0 0 48 20" fill="none" className="text-[#C5A059]/70">
          <path d="M46 10C36 10 32 4 24 4C16 4 14 12 6 12C2 12 0 16 0 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="4" r="2.5" fill="currentColor" />
        </svg>
        
        {/* Lotus Icon */}
        <div className="w-8 h-8 rounded-full border border-[#C5A059]/50 flex items-center justify-center bg-[#FAF7F2] text-[#8B1E1F] shadow-xs">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C12 3 8 8 8 13C8 16 10 18 12 18C14 18 16 16 16 13C16 8 12 3 12 3Z" />
            <path d="M12 18C8.5 18 5 15.5 5 12C5 9.5 7 7.5 7 7.5C7 7.5 5.5 11 7 14C8.5 17 12 18 12 18Z" opacity="0.7" />
            <path d="M12 18C15.5 18 19 15.5 19 12C19 9.5 17 7.5 17 7.5C17 7.5 18.5 11 17 14C15.5 17 12 18 12 18Z" opacity="0.7" />
          </svg>
        </div>

        {/* Right Cloud Flourish */}
        <svg width="36" height="16" viewBox="0 0 48 20" fill="none" className="text-[#C5A059]/70 scale-x-[-1]">
          <path d="M46 10C36 10 32 4 24 4C16 4 14 12 6 12C2 12 0 16 0 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="4" r="2.5" fill="currentColor" />
        </svg>
      </div>
      
      {title && (
        <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-wide text-[#2A2421] mt-3">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="text-sm md:text-base text-[#8C6D27] italic mt-1 font-serif max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function CeramicArtwork({
  type,
  glaze = 'men-ran',
  badgeText,
  className = '',
  imageUrl,
  showSeal = true
}: CeramicArtworkProps) {
  if (imageUrl) {
    return (
      <div className={`relative overflow-hidden w-full h-full flex items-center justify-center ${className}`}>
        <img
          src={imageUrl}
          alt="Gốm Sứ Bát Tràng"
          className="w-full h-full object-cover"
        />
        {showSeal && (
          <div className="absolute top-3 right-3 z-10">
            <SealStamp text="Bát Tràng" subtext="Chính Gốc" />
          </div>
        )}
      </div>
    );
  }

  // Determine primary and secondary gradient styles based on glaze
  const getGlazeThemes = () => {
    switch (glaze) {
      case 'men-lam':
        return {
          bgGrad: 'from-[#F0F4F8] via-[#E2EAF2] to-[#D0DDEB]',
          primaryColor: '#162E4A',
          accentColor: '#2B5885',
          goldAccent: '#C5A059',
          bodyGrad: ['#F7FAFC', '#E2ECF7', '#C2D7ED'],
          borderStyle: '#1E3A8A'
        };
      case 'men-ngoc':
        return {
          bgGrad: 'from-[#F2F8F6] via-[#E1EFEA] to-[#C9E3DA]',
          primaryColor: '#1B4636',
          accentColor: '#2A6650',
          goldAccent: '#D4AF37',
          bodyGrad: ['#F4FAF7', '#D1EAE1', '#A8D5C4'],
          borderStyle: '#1B4636'
        };
      case 'men-hoa-bien':
        return {
          bgGrad: 'from-[#1A1E2E] via-[#16213E] to-[#0F172A]',
          primaryColor: '#38BDF8',
          accentColor: '#A855F7',
          goldAccent: '#F59E0B',
          bodyGrad: ['#283554', '#1E293B', '#0E1726'],
          borderStyle: '#38BDF8'
        };
      case 'men-tu-sa':
        return {
          bgGrad: 'from-[#FDF7F2] via-[#F5E7DB] to-[#E9D3C0]',
          primaryColor: '#78350F',
          accentColor: '#92400E',
          goldAccent: '#B45309',
          bodyGrad: ['#8C3A16', '#6E2A0C', '#4D1D06'],
          borderStyle: '#92400E'
        };
      case 'men-tro':
        return {
          bgGrad: 'from-[#F9F7F3] via-[#EFEBE4] to-[#DDD7CE]',
          primaryColor: '#4A5568',
          accentColor: '#718096',
          goldAccent: '#C5A059',
          bodyGrad: ['#E6E2DA', '#CBC4B7', '#A39C8E'],
          borderStyle: '#718096'
        };
      case 'men-ran':
      default:
        return {
          bgGrad: 'from-[#FBF8F2] via-[#F4EDE0] to-[#EADECB]',
          primaryColor: '#8B1E1F',
          accentColor: '#C5A059',
          goldAccent: '#DAA520',
          bodyGrad: ['#F7F2E7', '#EDE3CF', '#D9CBB0'],
          borderStyle: '#8C6D27'
        };
    }
  };

  const theme = getGlazeThemes();

  return (
    <div className={`relative w-full h-full min-h-[260px] flex items-center justify-center overflow-hidden bg-gradient-to-b ${theme.bgGrad} p-4 rounded-t-sm group select-none ${className}`}>
      {/* Background Subtle Ceramic Crackle / Cloud Aura */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Soft Glow Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/40 blur-2xl pointer-events-none" />

      {/* Traditional Corner Accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#C5A059]/60 pointer-events-none" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#C5A059]/60 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#C5A059]/60 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#C5A059]/60 pointer-events-none" />

      {/* Traditional Seal Stamp */}
      {showSeal && (
        <div className="absolute top-3 right-3 z-10">
          <SealStamp text="Bát Tràng" subtext={glaze === 'men-ran' ? 'Men Rạn' : glaze === 'men-lam' ? 'Men Lam' : 'Thủ Công'} />
        </div>
      )}

      {/* Badge if present */}
      {badgeText && (
        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[11px] font-medium tracking-wide bg-[#8B1E1F] text-[#FDF8F0] shadow-sm flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DAA520] animate-pulse" />
          {badgeText}
        </div>
      )}

      {/* Ceramic Artwork SVG based on type */}
      <div className="relative z-0 w-44 h-48 md:w-52 md:h-56 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        {type === 'bat-huong' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_12px_16px_rgba(42,36,33,0.22)]">
            <defs>
              <linearGradient id="bh-body" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.bodyGrad[0]} />
                <stop offset="50%" stopColor={theme.bodyGrad[1]} />
                <stop offset="100%" stopColor={theme.bodyGrad[2]} />
              </linearGradient>
              <linearGradient id="gold-rim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8C6D27" />
                <stop offset="30%" stopColor="#F5D77F" />
                <stop offset="70%" stopColor="#DAA520" />
                <stop offset="100%" stopColor="#8C6D27" />
              </linearGradient>
            </defs>
            {/* Base Pedestal */}
            <ellipse cx="100" cy="172" rx="68" ry="12" fill="#52433B" opacity="0.3" />
            <rect x="52" y="152" width="96" height="12" rx="4" fill="url(#gold-rim)" />
            <path d="M46 164 Q100 170 154 164 L146 172 Q100 178 54 172 Z" fill="#78350F" />
            
            {/* Main Incense Burner Body */}
            <path d="M38 68 Q34 140 60 152 Q100 158 140 152 Q166 140 162 68 Z" fill="url(#bh-body)" stroke="#8C6D27" strokeWidth="1.5" />
            
            {/* Crackle Glaze Mesh Effect */}
            <path d="M50 82 L70 95 L65 120 L85 135 M150 85 L130 100 L135 125 L115 140 M90 75 L105 105 L95 130" stroke="#8C6D27" strokeWidth="0.8" opacity="0.45" strokeDasharray="3,1" fill="none" />
            
            {/* Song Long Chầu Nguyệt (Embossed Dragon Relief) */}
            <circle cx="100" cy="108" r="14" fill="url(#gold-rim)" />
            <circle cx="100" cy="108" r="10" fill="#8B1E1F" opacity="0.8" />
            <path d="M72 108 Q82 92 92 108 Q86 122 72 118" stroke="url(#gold-rim)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M128 108 Q118 92 108 108 Q114 122 128 118" stroke="url(#gold-rim)" strokeWidth="3" fill="none" strokeLinecap="round" />
            
            {/* Rim with Gold Inlay */}
            <ellipse cx="100" cy="68" rx="64" ry="14" fill="url(#gold-rim)" stroke="#8C6D27" strokeWidth="1.5" />
            <ellipse cx="100" cy="68" rx="54" ry="10" fill="#2E241E" />
            
            {/* Ash / Sacred Incense glow */}
            <ellipse cx="100" cy="68" rx="50" ry="8" fill="#D4CBBD" />
            {/* Incense Sticks */}
            <line x1="94" y1="66" x2="92" y2="28" stroke="#8B1E1F" strokeWidth="2.5" />
            <circle cx="92" cy="27" r="1.5" fill="#EF4444" className="animate-pulse" />
            <line x1="100" y1="66" x2="100" y2="22" stroke="#8B1E1F" strokeWidth="2.5" />
            <circle cx="100" cy="21" r="1.5" fill="#EF4444" className="animate-pulse" />
            <line x1="106" y1="66" x2="108" y2="30" stroke="#8B1E1F" strokeWidth="2.5" />
            <circle cx="108" cy="29" r="1.5" fill="#EF4444" className="animate-pulse" />
          </svg>
        )}

        {type === 'am-chen' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_12px_16px_rgba(42,36,33,0.2)]">
            <defs>
              <linearGradient id="teapot-body" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.bodyGrad[0]} />
                <stop offset="50%" stopColor={theme.bodyGrad[1]} />
                <stop offset="100%" stopColor={theme.bodyGrad[2]} />
              </linearGradient>
              <linearGradient id="bronze-wrap" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#78350F" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
            </defs>
            {/* Shadow */}
            <ellipse cx="90" cy="165" rx="60" ry="10" fill="#52433B" opacity="0.3" />
            
            {/* Tea Pot Handle (Bọc đồng) */}
            <path d="M135 90 C175 90 170 135 132 145" fill="none" stroke="url(#bronze-wrap)" strokeWidth="8" strokeLinecap="round" />
            <path d="M135 90 C175 90 170 135 132 145" fill="none" stroke="#FAF7F2" strokeWidth="2" strokeDasharray="3,3" />

            {/* Teapot Spout (Vòi ấm uốn lượn) */}
            <path d="M48 128 C30 120 22 96 16 88 C20 86 28 88 34 94 C40 102 46 112 50 120 Z" fill="url(#teapot-body)" stroke="#8C6D27" strokeWidth="1" />
            <ellipse cx="20" cy="89" rx="5" ry="3" fill="url(#bronze-wrap)" />

            {/* Teapot Body */}
            <ellipse cx="92" cy="125" rx="50" ry="38" fill="url(#teapot-body)" stroke="#8C6D27" strokeWidth="1.5" />
            
            {/* Crackle Glaze / Hand-drawn lotus on teapot */}
            <path d="M70 115 Q92 100 105 120 Q90 135 70 115 Z" fill={theme.primaryColor} opacity="0.18" />
            <path d="M65 105 L80 118 L75 138 M115 110 L100 125 L108 142" stroke="#8C6D27" strokeWidth="0.8" opacity="0.4" strokeDasharray="3,1" fill="none" />

            {/* Teapot Foot Rim */}
            <ellipse cx="92" cy="160" rx="30" ry="6" fill="url(#bronze-wrap)" />

            {/* Teapot Neck & Lid */}
            <rect x="70" y="86" width="44" height="6" fill="url(#bronze-wrap)" rx="2" />
            <ellipse cx="92" cy="85" rx="24" ry="7" fill="url(#teapot-body)" stroke="#8C6D27" strokeWidth="1" />
            <circle cx="92" cy="74" r="6" fill="url(#bronze-wrap)" />
            <circle cx="92" cy="73" r="3" fill="#FDF8F0" />

            {/* Small Tea Cup accompanying */}
            <g transform="translate(132, 125) scale(0.65)">
              <ellipse cx="30" cy="55" rx="22" ry="5" fill="#52433B" opacity="0.3" />
              <path d="M10 25 Q12 50 30 52 Q48 50 50 25 Z" fill="url(#teapot-body)" stroke="#8C6D27" strokeWidth="1.5" />
              <ellipse cx="30" cy="25" rx="20" ry="6" fill="url(#bronze-wrap)" />
              <ellipse cx="30" cy="25" rx="17" ry="5" fill="#4B6B40" opacity="0.75" />
            </g>
          </svg>
        )}

        {type === 'binh-hut-loc' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_14px_20px_rgba(42,36,33,0.25)]">
            <defs>
              <linearGradient id="bhl-body" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.bodyGrad[0]} />
                <stop offset="50%" stopColor={theme.bodyGrad[1]} />
                <stop offset="100%" stopColor={theme.bodyGrad[2]} />
              </linearGradient>
              <linearGradient id="gold-wave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8C6D27" />
                <stop offset="50%" stopColor="#F5E79D" />
                <stop offset="100%" stopColor="#DAA520" />
              </linearGradient>
            </defs>
            {/* Wooden Base */}
            <ellipse cx="100" cy="174" rx="55" ry="10" fill="#3E2723" />
            <rect x="58" y="162" width="84" height="10" rx="3" fill="#5D4037" />

            {/* Round Swelling Feng Shui Body (Miệng loe, cổ thắt, bụng phình to) */}
            <circle cx="100" cy="120" r="50" fill="url(#bhl-body)" stroke="#8C6D27" strokeWidth="1.5" />
            
            {/* Gold Sailboat Motif (Thuận Buồm Xuôi Gió) */}
            <g transform="translate(75, 95) scale(0.9)">
              <path d="M8 32 C18 36 32 36 42 32 L40 38 C26 42 16 42 6 38 Z" fill="url(#gold-wave)" />
              <path d="M24 10 L24 32 M12 28 C16 18 23 14 23 14 C23 14 21 24 12 28 Z" fill="url(#gold-wave)" />
              <path d="M25 8 C25 8 36 16 38 28 C31 27 25 24 25 24 Z" fill="url(#gold-wave)" />
            </g>

            {/* Narrow Neck */}
            <path d="M88 64 L86 78 Q100 82 114 78 L112 64 Z" fill="url(#bhl-body)" stroke="#8C6D27" strokeWidth="1" />

            {/* Wide Flared Mouth (Miệng loe rộng hút tài) */}
            <ellipse cx="100" cy="62" rx="36" ry="11" fill="url(#gold-wave)" stroke="#8C6D27" strokeWidth="1.5" />
            <ellipse cx="100" cy="62" rx="28" ry="7" fill="#1C1816" />

            {/* Crackle / Gold Luster Lines */}
            <path d="M60 110 Q75 140 100 155 Q130 145 140 115" stroke="url(#gold-wave)" strokeWidth="1.2" fill="none" opacity="0.6" />
          </svg>
        )}

        {type === 'loc-binh' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_14px_18px_rgba(42,36,33,0.22)]">
            <defs>
              <linearGradient id="lb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.bodyGrad[0]} />
                <stop offset="50%" stopColor={theme.bodyGrad[1]} />
                <stop offset="100%" stopColor={theme.bodyGrad[2]} />
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="180" rx="46" ry="8" fill="#3D322C" opacity="0.3" />
            {/* Ceramic Stand Base */}
            <path d="M68 162 L132 162 L128 176 L72 176 Z" fill="#6B4F3B" stroke="#8C6D27" strokeWidth="1" />
            
            {/* Tall Elegant Body (Lục bình tứ quý) */}
            <path d="M72 162 Q62 120 68 85 Q75 60 88 52 L112 52 Q125 60 132 85 Q138 120 128 162 Z" fill="url(#lb-grad)" stroke="#8C6D27" strokeWidth="1.5" />

            {/* Imperial Tùng Hạc / Lotus Cobalt Blue Brush Painting */}
            <path d="M85 90 Q100 75 115 90 Q110 120 100 145 Q88 120 85 90 Z" fill={theme.primaryColor} opacity="0.22" />
            <path d="M92 105 Q100 95 108 105" stroke={theme.primaryColor} strokeWidth="2.5" fill="none" opacity="0.8" />
            <circle cx="100" cy="98" r="3" fill="#8B1E1F" />

            {/* Fluted Lotus Mouth */}
            <path d="M88 52 Q82 36 76 32 Q100 26 124 32 Q118 36 112 52 Z" fill="url(#lb-grad)" stroke="#8C6D27" strokeWidth="1.5" />
            <ellipse cx="100" cy="30" rx="26" ry="7" fill="#C5A059" />
            <ellipse cx="100" cy="30" rx="20" ry="4" fill="#1F1916" />
          </svg>
        )}

        {type === 'bat-dia' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_16px_rgba(42,36,33,0.2)]">
            <defs>
              <linearGradient id="plate-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.bodyGrad[0]} />
                <stop offset="50%" stopColor={theme.bodyGrad[1]} />
                <stop offset="100%" stopColor={theme.bodyGrad[2]} />
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="155" rx="76" ry="18" fill="#42352E" opacity="0.25" />
            
            {/* Large Serving Plate */}
            <ellipse cx="100" cy="142" rx="75" ry="24" fill="url(#plate-grad)" stroke="#8C6D27" strokeWidth="1.5" />
            <ellipse cx="100" cy="142" rx="64" ry="18" fill="none" stroke="#C5A059" strokeWidth="1" strokeDasharray="4,2" />
            
            {/* Painted Lotus in Plate Center */}
            <circle cx="100" cy="142" r="10" fill={theme.primaryColor} opacity="0.2" />

            {/* Rice Bowl sitting gracefully on top */}
            <ellipse cx="100" cy="116" rx="42" ry="7" fill="#52433B" opacity="0.3" />
            <path d="M58 84 Q56 120 80 126 Q100 130 120 126 Q144 120 142 84 Z" fill="url(#plate-grad)" stroke="#8C6D27" strokeWidth="1.5" />
            
            {/* Cobalt blue rim and lotus decoration */}
            <ellipse cx="100" cy="84" rx="42" ry="12" fill="#FAF7F2" stroke="#8C6D27" strokeWidth="1.5" />
            <ellipse cx="100" cy="84" rx="38" ry="10" fill="none" stroke={theme.primaryColor} strokeWidth="2" opacity="0.8" />
            <ellipse cx="100" cy="84" rx="32" ry="8" fill="#F4ECE1" />
            
            {/* Hand-painted Lotus petals on bowl body */}
            <path d="M85 96 Q100 90 115 96 Q108 114 100 118 Q92 114 85 96 Z" fill={theme.primaryColor} opacity="0.3" />
            <circle cx="100" cy="102" r="3" fill="#8B1E1F" />
          </svg>
        )}

        {type === 'tuong-di-lac' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_12px_18px_rgba(42,36,33,0.25)]">
            <defs>
              <linearGradient id="statue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.bodyGrad[0]} />
                <stop offset="50%" stopColor={theme.bodyGrad[1]} />
                <stop offset="100%" stopColor={theme.bodyGrad[2]} />
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="172" rx="65" ry="12" fill="#3D3028" opacity="0.3" />
            {/* Lotus Throne Pedestal */}
            <path d="M42 152 Q100 162 158 152 L150 166 Q100 174 50 166 Z" fill="#8C6D27" stroke="#DAA520" strokeWidth="1" />
            
            {/* Smiling Buddha Body & Belly */}
            <circle cx="100" cy="126" r="38" fill="url(#statue-grad)" stroke="#8C6D27" strokeWidth="1.5" />
            
            {/* Exposed Happy Round Belly */}
            <ellipse cx="100" cy="132" rx="26" ry="20" fill="url(#statue-grad)" stroke="#C5A059" strokeWidth="1" />
            <circle cx="100" cy="135" r="2.5" fill="#8C6D27" />

            {/* Rosary Beads Necklace (Tràng hạt) */}
            <path d="M78 108 Q100 128 122 108" fill="none" stroke="#78350F" strokeWidth="4" strokeLinecap="round" strokeDasharray="1,6" />

            {/* Ingot / Gold Bar in Hand (Đĩnh vàng như ý) */}
            <path d="M136 112 C146 106 156 110 154 122 C144 126 134 122 136 112 Z" fill="#DAA520" stroke="#8C6D27" strokeWidth="1" />

            {/* Laughing Compassionate Head */}
            <circle cx="100" cy="80" r="22" fill="url(#statue-grad)" stroke="#8C6D27" strokeWidth="1.5" />
            {/* Long Ears (Tai dài phúc hậu) */}
            <path d="M78 74 C74 84 76 96 80 94" fill="none" stroke="#8C6D27" strokeWidth="3" strokeLinecap="round" />
            <path d="M122 74 C126 84 124 96 120 94" fill="none" stroke="#8C6D27" strokeWidth="3" strokeLinecap="round" />
            {/* Happy Eyes and Smile */}
            <path d="M90 76 Q94 72 98 76" stroke="#52433B" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M102 76 Q106 72 110 76" stroke="#52433B" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M92 86 Q100 96 108 86" stroke="#8B1E1F" strokeWidth="2.5" fill="#8B1E1F" strokeLinecap="round" />
          </svg>
        )}

        {type === 'hu-tra' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_12px_16px_rgba(42,36,33,0.2)]">
            <defs>
              <linearGradient id="tea-jar" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8C3A16" />
                <stop offset="50%" stopColor="#6E2A0C" />
                <stop offset="100%" stopColor="#4D1D06" />
              </linearGradient>
              <linearGradient id="copper-lid" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8C6D27" />
                <stop offset="50%" stopColor="#E5C278" />
                <stop offset="100%" stopColor="#8C6D27" />
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="168" rx="46" ry="8" fill="#3D3028" opacity="0.3" />
            {/* Cylindrical Antique Tea Caddy */}
            <rect x="58" y="76" width="84" height="86" rx="14" fill="url(#tea-jar)" stroke="#C5A059" strokeWidth="1" />
            
            {/* Carved Calligraphy / Lotus on Caddy */}
            <path d="M85 110 Q100 95 115 110 Q100 135 85 110 Z" fill="none" stroke="#C5A059" strokeWidth="1.5" opacity="0.7" />
            <circle cx="100" cy="112" r="3" fill="#C5A059" />
            <text x="100" y="142" textAnchor="middle" fill="#E5C278" fontSize="12" fontFamily="serif" letterSpacing="4">
              TRÀ
            </text>

            {/* Airtight Bronze Lid (Nắp đồng bọc chống ẩm) */}
            <rect x="64" y="62" width="72" height="16" rx="4" fill="url(#copper-lid)" stroke="#52433B" strokeWidth="1" />
            <circle cx="100" cy="54" r="8" fill="url(#copper-lid)" />
            <ellipse cx="100" cy="52" rx="4" ry="2" fill="#FAF7F2" opacity="0.8" />
          </svg>
        )}

        {type === 'mai-binh' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_14px_18px_rgba(42,36,33,0.22)]">
            <defs>
              <linearGradient id="mb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.bodyGrad[0]} />
                <stop offset="50%" stopColor={theme.bodyGrad[1]} />
                <stop offset="100%" stopColor={theme.bodyGrad[2]} />
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="176" rx="48" ry="9" fill="#3D3028" opacity="0.3" />
            {/* Base */}
            <rect x="68" y="160" width="64" height="10" rx="3" fill="#8C6D27" />
            
            {/* Slender High-shoulder Plum Vase (Dáng Mai Bình thanh tao) */}
            <path d="M72 160 Q66 112 56 82 Q52 64 74 58 L126 58 Q148 64 144 82 Q134 112 128 160 Z" fill="url(#mb-grad)" stroke="#8C6D27" strokeWidth="1.5" />

            {/* Crackle mesh */}
            <path d="M70 78 L90 92 L80 120 L110 135 M130 80 L112 102 L120 128" stroke="#8C6D27" strokeWidth="0.8" opacity="0.4" strokeDasharray="3,1" fill="none" />

            {/* Tùng Hạc / Plum Blossom gold accent */}
            <path d="M85 86 Q100 70 112 86 Q104 110 95 128" stroke="#C5A059" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="108" cy="80" r="4" fill="#8B1E1F" />
            <circle cx="92" cy="98" r="3" fill="#8B1E1F" />

            {/* Small Elegant Fluted Neck */}
            <rect x="86" y="44" width="28" height="14" rx="2" fill="url(#mb-grad)" stroke="#8C6D27" strokeWidth="1" />
            <ellipse cx="100" cy="44" rx="18" ry="5" fill="#DAA520" stroke="#8C6D27" strokeWidth="1" />
            <ellipse cx="100" cy="44" rx="12" ry="3" fill="#1C1816" />
          </svg>
        )}
      </div>

      {/* Decorative Bottom Shadow & Glaze Info */}
      <div className="absolute bottom-2 inset-x-4 flex items-center justify-between text-[11px] text-[#8C6D27] font-serif border-t border-[#C5A059]/30 pt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1F]" />
          Nung 1300°C
        </span>
        <span className="italic">Nghệ nhân vuốt tay</span>
      </div>
    </div>
  );
}
