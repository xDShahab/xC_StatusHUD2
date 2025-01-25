ESX, PlayerData = nil, {}
local PlayerInfoLoaded = false
local timer = 0
local isPaused, ToggleHUD = true, true
local Babat = false

function SetDisplay(opacity)
	SendNUIMessage({
		action  = 'setDisplay',
		opacity = opacity
	})
end

function SetName(name)
	SendNUIMessage({
		action  = 'setPlayerName',
		name = name
	})
end

function SetID(data)
	SendNUIMessage({
		action  = 'setID',
		source = data
	})
end

function SetJob(data)
	SendNUIMessage({
		action  = 'setJob',
		data = data
	})
end

function SetGang(data)
	SendNUIMessage({
		action  = 'setPlayerGang',
		value = 'hide',
		data = data
	})
end

function SetPing(ping)
	SendNUIMessage({
		action  = 'ping',
		ping = ping
	})
end

function SetData(data)
	SendNUIMessage({
		action  = 'setHUDData',
		data = data
	})
end

function SetStatus(data)
	SendNUIMessage({
		action  = 'setHUDStatus',
		data = data
	})
end

CreateThread(function()
    while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        Wait(1)
	end
end)

function Babatj()
ESX.TriggerServerCallback('xC_StatusHUD:avatar', function(cs)
    local steamkey = '47CE79BA33A5CDDB339D0181287A2322'
    local steamid = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" .. steamkey .. "&steamids=" .. cs
    SendNUIMessage({
		action = 'avatar',
        steamid = steamid
    })
end)
end

RegisterCommand('reload', function()
	ESX.TriggerServerCallback('ReloadData', function(Info) 
		SetName((Info.name):gsub('_', ' '))
		local playerPed  = PlayerPedId()
		local prevHealth = (GetEntityHealth(playerPed)-100)
		local armor = GetPedArmour(playerPed)
		SetData({health = prevHealth, armor = armor})
		SetJob({job = Info.job})
		SetGang({gang = Info.gang})
		SendNUIMessage({action = "setMDCash", money = ESX.Math.GroupDigits(Info.money)})
		Babatj()
	end)
end)

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
	PlayerData = xPlayer
end)

RegisterNetEvent('esx:setJob')
AddEventHandler('esx:setJob', function(job)
	PlayerData.job = job
	SetJob({job = PlayerData.job})
end)

RegisterNetEvent('esx:setGang')
AddEventHandler('esx:setGang', function(gang)
	PlayerData.gang = gang
	SetGang({gang = PlayerData.gang})
end)

RegisterNetEvent('esx_customui:updateStatus')
AddEventHandler('esx_customui:updateStatus', function(status)
	SetStatus(status)
end)
RegisterNetEvent('xC_StatusHUD:UpdateMoney')
AddEventHandler('xC_StatusHUD:UpdateMoney', function(money)
  	SendNUIMessage({action = "setMDCash", money = ESX.Math.GroupDigits(money)})
end)

-- Update HUD Data
CreateThread(function()
	while not PlayerData.name do
		Wait(300)
	end

	while true do
		Wait(1000)
		local playerPed  = PlayerPedId()
		local prevHealth = (GetEntityHealth(playerPed)-100)
		local armor = GetPedArmour(playerPed)

		SetData({health = prevHealth, armor = armor})
	end
end)

-- Pause Menu
CreateThread(function()
	while true do
		Wait(300)

		if IsPauseMenuActive() and not isPaused and ToggleHUD then
			isPaused = true
			SetDisplay(0.0)
		elseif not IsPauseMenuActive() and isPaused and ToggleHUD then
			isPaused = false
			SetDisplay(1.0)
		end
	end
end)

AddEventHandler('skinchanger:modelLoaded', function()
	while not PlayerData.name do
		Wait(100)
	end
	Wait(5000)
	while not HasPedHeadBlendFinished(PlayerPedId()) do
		Wait(10)
	end
	if not PlayerInfoLoaded then
		SetName((PlayerData.name):gsub('_', ' '))
		SetID(tostring(GetPlayerServerId(PlayerId())))
		SetJob({job = PlayerData.job})
		SetGang({gang = PlayerData.gang})
		SendNUIMessage({action = "setMDCash", money = ESX.Math.GroupDigits(PlayerData.money)})
		Babatj()
		PlayerInfoLoaded = true
	end
end)

RegisterNetEvent('xC_StatusHUD:UpdatePing')
AddEventHandler('xC_StatusHUD:UpdatePing', function(ping)
  SendNUIMessage({action = "ping", value = ping})
end)