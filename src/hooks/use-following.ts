
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { communityMembers as initialCommunityMembers } from '@/lib/community-data';

export interface FollowingMember {
    name: string;
    image: string;
    hint: string;
}

const FOLLOWING_STORAGE_KEY = 'followingMembers';

// Get a few default members to follow from the main list
const defaultFollowing = initialCommunityMembers.slice(0, 3);

export function useFollowing() {
  const [followingMembers, setFollowingMembers] = useState<FollowingMember[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedFollowing = localStorage.getItem(FOLLOWING_STORAGE_KEY);
      if (storedFollowing) {
        setFollowingMembers(JSON.parse(storedFollowing));
      } else {
        // If nothing is in storage, set the default list
        setFollowingMembers(defaultFollowing);
        localStorage.setItem(FOLLOWING_STORAGE_KEY, JSON.stringify(defaultFollowing));
      }
    } catch (error) {
      console.error('Failed to parse followed members from localStorage', error);
      setFollowingMembers(defaultFollowing);
    }
  }, []);

  const saveToLocalStorage = (members: FollowingMember[]) => {
    localStorage.setItem(FOLLOWING_STORAGE_KEY, JSON.stringify(members));
  };

  const isFollowing = useCallback(
    (memberName: string) => {
      return followingMembers.some(member => member.name === memberName);
    },
    [followingMembers]
  );

  const followMember = useCallback((member: FollowingMember) => {
    if (!isFollowing(member.name)) {
      const updatedFollowing = [...followingMembers, member];
      setFollowingMembers(updatedFollowing);
      saveToLocalStorage(updatedFollowing);
      toast({ title: `You are now following ${member.name}.` });
    }
  }, [followingMembers, isFollowing, toast]);
  
  const unfollowMember = useCallback((memberName: string) => {
    if (isFollowing(memberName)) {
      const updatedFollowing = followingMembers.filter(m => m.name !== memberName);
      setFollowingMembers(updatedFollowing);
      saveToLocalStorage(updatedFollowing);
      toast({ title: `You have unfollowed ${memberName}.` });
    }
  }, [followingMembers, isFollowing, toast]);

  const toggleFollow = useCallback((member: FollowingMember) => {
    if (isFollowing(member.name)) {
        unfollowMember(member.name);
    } else {
        followMember(member);
    }
  }, [isFollowing, followMember, unfollowMember]);

  return { followingMembers, isFollowing, toggleFollow, unfollowMember };
}
