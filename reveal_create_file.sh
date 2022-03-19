# Total counts have to be replaced with the nft counts after the sale.
total_count=30 

percent_0=10
percent_1=13
percent_2=14
percent_3=16
percent_4=21

declare -A metadata_number
declare -A whole_array

metadata_number[0]=$(($percent_0 * $total_count / 100))
metadata_number[1]=$(($percent_1 * $total_count / 100))
metadata_number[2]=$(($percent_2 * $total_count / 100))
metadata_number[3]=$(($percent_3 * $total_count / 100))
metadata_number[4]=$(($percent_4 * $total_count / 100))
metadata_number[5]=$(($total_count - ${metadata_number[0]} - ${metadata_number[1]} - ${metadata_number[2]} - ${metadata_number[3]} - ${metadata_number[4]}))

echo "${metadata_number[*]}" 

total_count=$(( $total_count - 1))
temp=0

while [ "$temp" -le "$total_count" ]; do
	while true 
	do
		random_num=$(( $RANDOM % ${#metadata_number[@]} ))
    
		if [[ "${metadata_number[$random_num]}" -ge 1 ]] 
		then
			metadata_number[$random_num]=$(( ${metadata_number[$random_num]} - 1 ))
			whole_array[$temp]=$random_num
			break
		fi
	done

	temp=$(( $temp + 1 ))
done

echo "${whole_array[*]}"

count=1
for index in "${whole_array[@]}"
do
	case $index in
		0)
			# Metadata Pattern for the Staff of Shib
			echo '''{
				"description": "Forged in the mighty land of Ever, this Ever Chest holds a relic of a battle-scarred past. Only the mightiest warriors will be able to unlock its full potential. Be warned, for those who attempt to unveil its mighty powers will be put through the ultimate test. For those who succeed, the Ever Weapons will join your arsenal.",
				"animation_url": "https://everweapons.mypinata.cloud//ipfs/Qmd5FtCsAHmj47FnVATyiryFjFJnsri4znDcQitgpM2J2V/1_Staff_of_Shib.mp4",
				"name": "The Staff of Shib #COUNT",
				"attributes": [
          {
            "trait_type": "Whitelist",
            "value": "1X Guaranteed Whitelist Allocation"
          },
          {
            "trait_type": "Staking Rewards",
            "value": "31%"
          }
				]
			}
				''' >> ${count}

			sed -i s/COUNT/${count}/g ${count}
			echo "case 0 = pattern 1"
			;;
		1)
			# Metadata Pattern for the Bitcoin Baton
			echo '''{
				"description": "Forged in the mighty land of Ever, this Ever Chest holds a relic of a battle-scarred past. Only the mightiest warriors will be able to unlock its full potential. Be warned, for those who attempt to unveil its mighty powers will be put through the ultimate test. For those who succeed, the Ever Weapons will join your arsenal.",
				"animation_url": "https://everweapons.mypinata.cloud//ipfs/Qmd5FtCsAHmj47FnVATyiryFjFJnsri4znDcQitgpM2J2V/2_Bitcoin_Baton.mp4",
				"name": "The Bitcoin Baton #COUNT",
				"attributes": [
          {
            "trait_type": "Staking Rewards",
            "value": "23%"
          }
				]
			}
				''' >> ${count}

			sed -i s/COUNT/${count}/g ${count}
			echo "case 1 = pattern 2"
			;;
		2)
			# Metadata Pattern for the Ever Wand
			echo '''{
				"description": "Forged in the mighty land of Ever, this Ever Chest holds a relic of a battle-scarred past. Only the mightiest warriors will be able to unlock its full potential. Be warned, for those who attempt to unveil its mighty powers will be put through the ultimate test. For those who succeed, the Ever Weapons will join your arsenal.",
				"animation_url": "https://everweapons.mypinata.cloud//ipfs/Qmd5FtCsAHmj47FnVATyiryFjFJnsri4znDcQitgpM2J2V/3_Ever_Wand.mp4",
				"name": "The Ever Wand #COUNT",
				"attributes": [
          {
            "trait_type": "Staking Rewards",
            "value": "18%"
          }
				]
			}
				''' >> ${count}

			sed -i s/COUNT/${count}/g ${count}
			echo "case 2 = pattern 3"
			;;
		3)
			# Metadata Pattern for the Staff of ETH
			echo '''{
				"description": "Forged in the mighty land of Ever, this Ever Chest holds a relic of a battle-scarred past. Only the mightiest warriors will be able to unlock its full potential. Be warned, for those who attempt to unveil its mighty powers will be put through the ultimate test. For those who succeed, the Ever Weapons will join your arsenal.",
				"animation_url": "https://everweapons.mypinata.cloud//ipfs/Qmd5FtCsAHmj47FnVATyiryFjFJnsri4znDcQitgpM2J2V/4_Staff_of_ETH.mp4",
				"name": "The Staff of ETH #COUNT",
				"attributes": [
          {
            "trait_type": "Staking Rewards",
            "value": "14%"
          }
				]
			}
				''' >> ${count}

			sed -i s/COUNT/${count}/g ${count}
			echo "case 3 = pattern 4"			
			;;
		4)
			# Metadata Pattern for the Usceptor
			echo '''{
				"description": "Forged in the mighty land of Ever, this Ever Chest holds a relic of a battle-scarred past. Only the mightiest warriors will be able to unlock its full potential. Be warned, for those who attempt to unveil its mighty powers will be put through the ultimate test. For those who succeed, the Ever Weapons will join your arsenal.",
				"animation_url": "https://everweapons.mypinata.cloud//ipfs/Qmd5FtCsAHmj47FnVATyiryFjFJnsri4znDcQitgpM2J2V/5_The_Usceptor.mp4",
				"name": "The Usceptor #COUNT",
				"attributes": [
          {
            "trait_type": "Staking Rewards",
            "value": "9%"
          }
				]
			}
				''' >> ${count}

			sed -i s/COUNT/${count}/g ${count}
			echo "case 4 = pattern 5"			
			;;
		5)
			# Metadata Pattern for the Tether Trident
			echo '''{
				"description": "Forged in the mighty land of Ever, this Ever Chest holds a relic of a battle-scarred past. Only the mightiest warriors will be able to unlock its full potential. Be warned, for those who attempt to unveil its mighty powers will be put through the ultimate test. For those who succeed, the Ever Weapons will join your arsenal.",
				"animation_url": "https://everweapons.mypinata.cloud//ipfs/Qmd5FtCsAHmj47FnVATyiryFjFJnsri4znDcQitgpM2J2V/6_The_Tether_Trident.mp4",
				"name": "The Tether Trident #COUNT",
				"attributes": [
          {
            "trait_type": "Staking Rewards",
            "value": "6%"
          }
				]
			}
				''' >> ${count}

			sed -i s/COUNT/${count}/g ${count}
			echo "case 5 = pattern 6"			
			;;
		*)
			echo "exception case"
			;;
	esac
	count=$(( $count + 1 ))
done