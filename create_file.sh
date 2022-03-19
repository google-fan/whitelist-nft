
for count in {1..5000}
do
	echo '''{
	  "description": "Forged in the mighty land of Ever, this Ever Chest holds a relic of a battle-scarred past. Only the mightiest warriors will be able to unlock its full potential. Be warned, for those who attempt to unveil its mighty powers will be put through the ultimate test. For those who succeed, the Ever Weapons will join your arsenal.",
	  "animation_url": "https://everweapons.mypinata.cloud//ipfs/Qmd5FtCsAHmj47FnVATyiryFjFJnsri4znDcQitgpM2J2V/Chest.mp4",
	  "name": "Ever Chest #COUNT",
	  "attributes": [
	    {
	      "trait_type": "Ever Chest",
	      "value": "Untapped Power"
	    }
	  ]
	}
	''' >> ${count}

	sed -i s/COUNT/${count}/g ${count}
done
