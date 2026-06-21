'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode, type ElementType } from 'react';
import { ease } from '@/lib/animations';

/* ========================================
   AnimatedText — Split text reveal
   Supports char, word, and line splits
   ======================================== */

interface AnimatedTextProps {
  children: string;
  splitBy?: 'char' | 'word' | 'line';
  as?: ElementType;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
  style?: React.CSSProperties;
}

const staggerMap = {
  char: 0.025,
  word: 0.06,
  line: 0.1,
};

export default function AnimatedText({
  children,
  splitBy = 'word',
  as: Tag = 'div',
  className = '',
  delay = 0,
  once = true,
  amount = 0.2,
  style,
}: AnimatedTextProps) {
  const MotionTag = motion.create(Tag as string) as React.ComponentType<HTMLMotionProps<'div'>>;

  const lines = children.split('/').map((s) => s.trim());

  const renderUnits = () => {
    if (splitBy === 'line') {
      return lines.map((line, lineIndex) => (
        <span key={lineIndex} style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'block' }}
            variants={{
              hidden: { y: '115%' },
              visible: {
                y: '0%',
                        transition: {
                          duration: 0.8,
                          ease: ease.out as any,
                        },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ));
    }

    return lines.map((line, lineIndex) => {
      const words = line.split(' ');

      return (
        <span key={lineIndex} style={{ display: 'block' }}>
          {words.map((word, wordIndex) => {
            if (splitBy === 'word') {
              return (
                <span
                  key={`${lineIndex}-${wordIndex}`}
                  style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}
                >
                  <motion.span
                    style={{ display: 'inline-block' }}
                    variants={{
                      hidden: { y: '115%' },
                      visible: {
                        y: '0%',
                        transition: {
                          duration: 0.8,
                          ease: ease.out as any,
                        },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            }

            /* char split */
            return (
              <span key={`${lineIndex}-${wordIndex}`} style={{ display: 'inline-block', marginRight: '0.3em' }}>
                {word.split('').map((char, charIndex) => (
                  <span
                    key={`${lineIndex}-${wordIndex}-${charIndex}`}
                    style={{ display: 'inline-block', overflow: 'hidden' }}
                  >
                    <motion.span
                      style={{ display: 'inline-block' }}
                      variants={{
                        hidden: { y: '115%' },
                        visible: {
                          y: '0%',
                          transition: {
                            duration: 0.8,
                            ease: ease.out as any,
                          },
                        },
                      }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </span>
            );
          })}
        </span>
      );
    });
  };

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerMap[splitBy],
            delayChildren: delay,
          },
        },
      }}
    >
      {renderUnits()}
    </MotionTag>
  );
}
